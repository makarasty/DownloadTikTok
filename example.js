const { downloadTiktok } = require("./index.js") // require("downloadTiktok")

async function main() {
	const data = await downloadTiktok('https://vm.tiktok.com/ZMYTkTEBv/')
	console.log(data)

	downloadTiktok('https://vm.tiktok.com/ZMYTkTEBv/').then(data => {
		console.log(data)
	})
}

main()