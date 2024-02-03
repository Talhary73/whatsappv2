const { Tiktok } = require('@xct007/tiktok-scraper');

const url = 'https://vt.tiktok.com/ZGJBtcsDq/';
Tiktok(url).then((json) => {
  console.log(json['download'].nowm);
});