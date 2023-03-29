const { request } = require('https')
module.exports.tt_downloader = url => {
	return new Promise(
		async (res, rej) => {
			let
				pD = '',
				Data = JSON.stringify({ url: url }),
				req = request({
					hostname: 'ssstik.live', path: '/api/convert', method: 'POST',
					headers: {
						"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0",
						'Content-Type': 'application/json', 'Content-Length': Data.length
					}
				}, resource => {
					resource.on('data', c => pD += c)
					resource.on('end', () => {
						let D = JSON.parse(pD)
						res({
							status: resource.statusCode,
							quality: D?.video_quality,
							duration: D.meta.duration,
							timestamp: D?.timestamp,
							source: D.meta?.source,
							title: D?.meta?.title,
							video: D?.url[0]?.url,
							audio: D?.url[1]?.url,
							thumb: D.thumb,
							sd: D?.sd,
							hd: D?.hd,
						})
					})
				}).on('error', e => rej(e))
			req.write(Data)
			req.end()
		}
	)
}
