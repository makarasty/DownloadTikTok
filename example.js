const dt = require("./index.js") // require("downloadtiktok")

async function master() {
	// Get the response from the server
	const result = await dt.downloadTiktok('https://vm.tiktok.com/ZGefRquMA/')
	// Print the result (the server response)
	console.log(result)

	// Get videos only
	const videos = dt.filterVideo(result.medias)
	// Print the videos
	console.log(videos);

	// Get audios only
	const audios = dt.filterAudio(result.medias)
	// Print the audios
	console.log(audios);

	// Get the videos without the watermark
	const noWatermark = dt.filterNoWatermark(result.medias)
	// Print the videos without watermark
	console.log(noWatermark);

	// Get the best video within a limited size
	const bestVideo = dt.getBestMediaWithinLimit(videos, 50 * 1024 * 1024)
	// Print the best video
	console.log(bestVideo);

	// Get the best audio within a limited size
	const bestAudio = dt.getBestMediaWithinLimit(audios, 50 * 1024 * 1024)
	// Print the best audio
	console.log(bestAudio);

	// Get the buffer from the video link
	const videoBuffer = await dt.getBufferFromURL(bestVideo.url)
	// Print the video buffer
	console.log(videoBuffer)

	// Get the buffer from the audio link
	const audioBuffer = await dt.getBufferFromURL(bestAudio.url)
	// Print the audio buffer
	console.log(audioBuffer)
}

master()