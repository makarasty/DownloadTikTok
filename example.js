main()
async function main() {
	const { tt_downloader } = require("./index.js") // require("tt_downloader")
	
	console.log(await tt_downloader('https://vm.tiktok.com/ZMFtopdf5/'))
}