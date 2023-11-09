const { igApi } = require("insta-fetcher");

const insta = async (url)=>{
try {
 let out = await ig.fetchPost("https://www.instagram.com/reel/CXhW_4sp32Z/")
console.log(out)
} catch (error) {
  console.log(error)
}
}
insta()