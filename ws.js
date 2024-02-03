const  { music } = require("@xct007/frieren-scraper");

// search apps/games
const APKMODY = async()=>{
// more short query, more results found.
const ArrObj = await music.search("pakistan zindabad");
console.log(ArrObj);
// fetch direct download url
// High memory usage. LOL
// const Obj = await apkmody.download("https://APKMODY_URL");
// console.log(Obj);
}
APKMODY()