const API="https://api.spotify.com/v1",AUTH="https://accounts.spotify.com/authorize",TOKEN="https://accounts.spotify.com/api/token";
const SCOPES=["user-read-private","playlist-read-private","playlist-read-collaborative"];
const b64url=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
async function challengeFor(verifier){return b64url(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(verifier)));}
function randomString(size=64){return b64url(crypto.getRandomValues(new Uint8Array(size)));}
export function getStoredClientId(){return localStorage.getItem("openfy:spotify-client-id")||"";}
export function setStoredClientId(value){localStorage.setItem("openfy:spotify-client-id",value.trim());}
export async function beginSpotifyLogin(clientId){
 if(!clientId||!/^[a-zA-Z0-9]+$/.test(clientId))throw new Error("Enter a valid Spotify Client ID first.");
 const verifier=randomString(64),state=randomString(24);
 sessionStorage.setItem("openfy:pkce-verifier",verifier);sessionStorage.setItem("openfy:oauth-state",state);
 const redirectUri=window.location.origin+window.location.pathname,challenge=await challengeFor(verifier);
 const params=new URLSearchParams({client_id:clientId,response_type:"code",redirect_uri:redirectUri,code_challenge_method:"S256",code_challenge:challenge,state,scope:SCOPES.join(" ")});
 window.location.assign(AUTH+"?"+params.toString());
}
export async function finishSpotifyLogin(clientId){
 const params=new URLSearchParams(window.location.search),code=params.get("code");if(!code)return false;
 const state=params.get("state"),expectedState=sessionStorage.getItem("openfy:oauth-state"),verifier=sessionStorage.getItem("openfy:pkce-verifier");
 window.history.replaceState({},document.title,window.location.pathname);
 if(!state||state!==expectedState||!verifier)throw new Error("Spotify sign-in state did not match. Please try connecting again.");
 const body=new URLSearchParams({client_id:clientId,grant_type:"authorization_code",code,redirect_uri:window.location.origin+window.location.pathname,code_verifier:verifier});
 const response=await fetch(TOKEN,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body}),data=await response.json();
 if(!response.ok)throw new Error(data.error_description||data.error||"Spotify sign-in failed.");
 sessionStorage.setItem("openfy:access-token",data.access_token);sessionStorage.setItem("openfy:token-expiry",String(Date.now()+data.expires_in*1000));
 sessionStorage.removeItem("openfy:pkce-verifier");sessionStorage.removeItem("openfy:oauth-state");return true;
}
export function disconnectSpotify(){["openfy:access-token","openfy:token-expiry","openfy:pkce-verifier","openfy:oauth-state"].forEach(k=>sessionStorage.removeItem(k));}
export function hasSpotifySession(){const token=sessionStorage.getItem("openfy:access-token"),expiry=Number(sessionStorage.getItem("openfy:token-expiry")||0);return Boolean(token&&expiry>Date.now()+15000);}
async function api(path){
 const token=sessionStorage.getItem("openfy:access-token"),expiry=Number(sessionStorage.getItem("openfy:token-expiry")||0);
 if(!token||expiry<=Date.now()){disconnectSpotify();throw new Error("Your Spotify session expired. Connect again to continue.");}
 const response=await fetch(API+path,{headers:{Authorization:"Bearer "+token}}),data=await response.json().catch(()=>({}));
 if(!response.ok){if(response.status===401)disconnectSpotify();throw new Error(data.error?.message||"Spotify API request failed ("+response.status+").");}return data;
}
export const getSpotifyProfile=()=>api("/me");
export async function searchSpotifyTracks(query){if(!query.trim())return[];const data=await api("/search?type=track&limit=12&q="+encodeURIComponent(query.trim()));return data.tracks?.items||[];}
export async function getSpotifyPlaylists(){const data=await api("/me/playlists?limit=20");return data.items||[];}
export function spotifyTrackFromUrl(input){try{const url=new URL(input.trim());if(!["open.spotify.com","play.spotify.com"].includes(url.hostname))return null;const parts=url.pathname.split("/").filter(Boolean),index=parts.indexOf("track");return index<0||!parts[index+1]?null:parts[index+1].split("?")[0];}catch{return null;}}
export const getSpotifyTrack=id=>api("/tracks/"+encodeURIComponent(id));
export function spotifyLink(item){return item?.external_urls?.spotify||(item?.id?"https://open.spotify.com/track/"+item.id:"https://open.spotify.com/");}
export function formatDuration(ms=0){const seconds=Math.floor(ms/1000);return Math.floor(seconds/60)+":"+String(seconds%60).padStart(2,"0");}
