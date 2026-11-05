import { router, json, error } from '@appdeploy/sdk';

type RobloxUser = { id: number; name: string; displayName?: string };
type RobloxImage = { targetId?: number; imageUrl?: string };
type RobloxAsset = { id?: number; assetId?: number; name?: string; itemType?: string; creatorName?: string; lowestPrice?: number; price?: number };
type RobloxGame = { id: number; rootPlaceId?: number; name: string; description?: string; placeVisits?: number; playing?: number; visits?: number; genre_l1?: string };
type RobloxCreator = { Name?: string };
type RobloxAssetDetails = { Name?: string; PriceInRobux?: number | null; IsForSale?: boolean; Creator?: RobloxCreator };

async function readJson<T>(url: string, init?: RequestInit): Promise<T | null> {
    const response = await fetch(url, init);
    if (!response.ok) return null;
    return await response.json() as T;
}

async function thumbnailsForAssets(ids: number[]): Promise<Map<number, string>> {
    if (!ids.length) return new Map();
    const response = await readJson<{ data?: RobloxImage[] }>(
        'https://thumbnails.roblox.com/v1/assets?assetIds=' + ids.join(',') + '&size=420x420&format=Png'
    );
    const images = new Map<number, string>();
    for (const item of response?.data ?? []) {
        if (item.targetId && item.imageUrl) images.set(item.targetId, item.imageUrl);
    }
    return images;
}

export const handler = router({
    'GET /api/asset/:id': [async ({ params }) => {
        const id = String(params.id ?? '');
        if (!/^\d+$/.test(id)) return error('A numeric asset ID is required.', 400);
        const [details, images] = await Promise.all([
            readJson<RobloxAssetDetails>('https://economy.roblox.com/v2/assets/' + id + '/details'),
            thumbnailsForAssets([Number(id)]),
        ]);
        if (!details) return error('Public Roblox item details are unavailable.', 502);
        return json({
            assetId: id,
            name: String(details.Name ?? ('Catalog item #' + id)).trim(),
            price: details.PriceInRobux ?? null,
            creator: String(details.Creator?.Name ?? 'Roblox creator'),
            forSale: Boolean(details.IsForSale),
            image: images.get(Number(id)) ?? '',
            type: 'Accessories',
        });
    }],

    'POST /api/roblox/profile': [async ({ body }) => {
        const input = (body ?? {}) as { username?: string };
        const username = String(input.username ?? '').trim().slice(0, 32);
        if (!username) return error('Enter a public Roblox username.', 400);
        const lookup = await readJson<{ data?: RobloxUser[] }>(
            'https://users.roblox.com/v1/usernames/users',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernames: [username], excludeBannedUsers: true }),
            }
        );
        const user = lookup?.data?.[0];
        if (!user) return error('Public Roblox username not found.', 404);
        const [avatar, followers, friends, details] = await Promise.all([
            readJson<{ data?: RobloxImage[] }>('https://thumbnails.roblox.com/v1/users/avatar?userIds=' + user.id + '&size=420x420&format=Png&isCircular=false'),
            readJson<{ count?: number }>('https://friends.roblox.com/v1/users/' + user.id + '/followers/count'),
            readJson<{ count?: number }>('https://friends.roblox.com/v1/users/' + user.id + '/friends/count'),
            readJson<{ description?: string }>('https://users.roblox.com/v1/users/' + user.id),
        ]);
        return json({
            id: user.id,
            username: user.name,
            displayName: user.displayName || user.name,
            avatarUrl: avatar?.data?.[0]?.imageUrl ?? '',
            followers: Number(followers?.count ?? 0),
            friendsCount: Number(friends?.count ?? 0),
            description: String(details?.description ?? ''),
        });
    }],

    'GET /api/roblox/friends': [async ({ query }) => {
        const id = String(query.userId ?? '');
        if (!/^\d+$/.test(id)) return error('Import a public Roblox profile first.', 400);
        const result = await readJson<{ data?: Array<{ id: number; name: string; displayName?: string }> }>(
            'https://friends.roblox.com/v1/users/' + id + '/friends'
        );
        if (!result) return error('Friends list is private or unavailable.', 403);
        return json({ friends: (result.data ?? []).map((friend) => ({ id: friend.id, name: friend.name, displayName: friend.displayName })) });
    }],

    'GET /api/roblox/games': [async ({ query }) => {
        const id = String(query.userId ?? '');
        if (!/^\d+$/.test(id)) return error('Import a public Roblox profile first.', 400);
        const result = await readJson<{ data?: RobloxGame[] }>(
            'https://games.roblox.com/v2/users/' + id + '/games?accessFilter=Public&limit=50&sortOrder=Asc'
        );
        if (!result) return error('Public creations are unavailable.', 502);
        const games = (result.data ?? []).slice(0, 30);
        const ids = games.map((game) => game.id).filter(Boolean);
        const thumbs = ids.length
            ? await readJson<{ data?: RobloxImage[] }>('https://thumbnails.roblox.com/v1/games/icons?universeIds=' + ids.join(',') + '&size=256x256&format=Png&isCircular=false')
            : null;
        const imageMap = new Map<number, string>();
        for (const item of thumbs?.data ?? []) if (item.targetId && item.imageUrl) imageMap.set(item.targetId, item.imageUrl);
        return json({
            games: games.map((game) => ({
                name: game.name,
                description: game.description || 'Roblox experience',
                emoji: '🎮',
                visits: Number(game.placeVisits ?? 0).toLocaleString('en-US'),
                universeId: game.id,
                image: imageMap.get(game.id) ?? '',
            })),
        });
    }],

    'GET /api/roblox/worn': [async ({ query }) => {
        const id = String(query.userId ?? '');
        if (!/^\d+$/.test(id)) return error('Import a public Roblox profile first.', 400);
        const result = await readJson<{ assets?: Array<{ id: number; name: string }> }>(
            'https://avatar.roblox.com/v1/users/' + id + '/avatar'
        );
        if (!result) return error('Public avatar data is unavailable.', 502);
        const assets = result.assets ?? [];
        const images = await thumbnailsForAssets(assets.map((asset) => asset.id));
        return json({ assets: assets.map((asset) => ({ id: asset.id, name: asset.name, image: images.get(asset.id) ?? '' })) });
    }],

    'GET /api/roblox/collectibles': [async ({ query }) => {
        const id = String(query.userId ?? '');
        if (!/^\d+$/.test(id)) return error('Import a public Roblox profile first.', 400);
        const result = await readJson<{ data?: Array<{ assetId: number; name: string }> }>(
            'https://inventory.roblox.com/v1/users/' + id + '/assets/collectibles?limit=100&sortOrder=Desc'
        );
        if (!result) return error('Collectibles are private or unavailable.', 403);
        const assets = result.data ?? [];
        const images = await thumbnailsForAssets(assets.map((asset) => asset.assetId));
        return json({ assets: assets.map((asset) => ({ assetId: asset.assetId, name: asset.name, image: images.get(asset.assetId) ?? '' })) });
    }],
});
