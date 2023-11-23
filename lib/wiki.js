const wiki = require('wikipedia');

const wiki1 = async (client, m,text,pdf ) => {
	try {

		const searchResults = await wiki.search(text, {suggestion: true, limit: 10});
		
		const page = await wiki.page(searchResults.results[0].title);
        const summary = await page.summary()
        
       console.log(summary)
		//Response of type @Page object
		if(pdf){
            const res = await page.pdf()
            client.sendMessage(m.sender,{document:{url:res},mimetype:'application/pdf',fileName:searchResults.results[0].title , caption:summary.extract})
        }
		//Response of type @wikiSummary - contains the intro and the main image
	} catch (error) {
		console.log(error);
		client.sendMessage(m.sender,{text:error.message})		//=> Typeof wikiError
	}
}
module.exports = wiki1
