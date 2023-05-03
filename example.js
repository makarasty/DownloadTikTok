const { tt_downloader } = require("./index.js") // require("tt_downloader")

async function main() {
	const data = await tt_downloader('https://vm.tiktok.com/ZMYTkTEBv/')
	console.log(data)

	tt_downloader('https://vm.tiktok.com/ZMYTkTEBv/').then(data => {
		console.log(data)
	})
}

main()