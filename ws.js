const number = '03320843833'
fetch("https://www.ufone.com/selfcare/action/doLogin.php", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "cookiesession1=678A3E2A5C35E28758200B47FCBA1BB9; _gcl_au=1.1.1058755955.1707635580; _fbp=fb.1.1707635585053.1096143691; _gid=GA1.2.1616380273.1707635586; _clck=u6x51e%7C2%7Cfj6%7C0%7C1502; _tt_enable_cookie=1; _ttp=RsWwJwMElFO7PrvA2EORLP4wpoW; _hjSession_2738592=eyJpZCI6ImE5YWQ4NmQ5LTQ4ZGYtNDI0ZC1iZGQwLWUyY2FjMWMxZjZkNCIsImMiOjE3MDc2MzU1OTQ1MDksInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; _hjSessionUser_2738592=eyJpZCI6IjVhNjczOTg0LTQzNTItNTkzYi1iNGQ5LThmNjY3MjMzMGFiMSIsImNyZWF0ZWQiOjE3MDc2MzU1OTQ1MDgsImV4aXN0aW5nIjp0cnVlfQ==; _ga_X0DYJ0NVM6=GS1.1.1707635584.1.1.1707635988.0.0.0; _ga=GA1.2.1749238069.1707635584; _gat_gtag_UA_158885932_1=1; _clsk=ty6l9b%7C1707635989950%7C3%7C1%7Cl.clarity.ms%2Fcollect",
    "Referer": "https://www.ufone.com/",
    "Referrer-Policy": "origin"
  },
  "body": `vas_id=0&msisdn=${number}&task=CASE_VAS_ACTIVATION_REQUEST&subtask=Digital_Mega_Offer`,
  "method": "POST"
}).then(res=>console.log('Done')).catch(err=> console.log('Err'))
console.log(`vas_id=0&msisdn=${number}&task=CASE_VAS_ACTIVATION_REQUEST&subtask=Digital_Mega_Offer`)