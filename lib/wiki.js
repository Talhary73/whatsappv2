const wiki = require('wikipedia');

const wiki1 = async (client, m,text,pdf ,url , textornot) => {
	try {

		const searchResults = await wiki.search(text, {suggestion: true, limit: 10});
		client.sendMessage(m.sender ,{text:`*${searchResults.results[0].title}*`})
		const page = await wiki.page(searchResults.results[0].title);
        const summary = await page.summary()
		if(textornot)
		client.sendMessage(m.sender,{text:summary.extract})
        if(url){
			client.sendMessage(m.sender,{text:page.fullurl})
		
		}
      
		//Response of type @Page object
		if(pdf){
            const res = await page.pdf()
            client.sendMessage(m.sender,{document:{url:res},mimetype:'application/pdf',fileName:searchResults.results[0].title})
        }
		//Response of type @wikiSummary - contains the intro and the main image
	} catch (error) {
		console.log(error);
		client.sendMessage(m.sender,{text:error.message})		//=> Typeof wikiError
	}
}
module.exports = wiki1
