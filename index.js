const { request } = require('https')

module.exports.downloadTiktok = (url, dataToParse = '') => new Promise((resolve, reject) => {
	const options = JSON.stringify({ url: url, target: 'mp4' })
	request({
		hostname: 'save-from.com', path: '/en/api/convert', method: 'POST', headers: {
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
			'Content-Type': 'application/json', 'Content-Length': options.length
		}
	}, function (res) {
		res.on('data', chunk => dataToParse = dataToParse + chunk)
		res.on('end', function () {
			try {
				const { thumbnail, formats, title, id } = JSON.parse(dataToParse)
				if (formats.length === 1) {
					resolve({ photos: true, thumbnail, title, id, watermark: null, video: null, music: formats[0]?.url })
				} else {
					resolve({ photos: false, thumbnail, title, id, watermark: formats[0]?.url, video: formats[3]?.url, music: formats[6]?.url })
				}
			} catch (e) { reject('query failed -.-') }
		})
	}).on('error', reject).end(options)
})