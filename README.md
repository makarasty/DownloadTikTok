# This library uses https://snapdouyin.app/ !

**Nodejs** library that can download videos from **TikTok without watermark** and other formats

# OS Dependencies
- Node.js

# Lib Dependencies
- undici

# JSDoc
```js
/**
* @typedef {Object} Media
* @property {string} url - The URL of the media file
* @property {string} quality - The quality of the media file (e.g., "hd", "sd", "watermark", "128kbps")
* @property {string} extension - The file extension of the media file (e.g., "mp4", "mp3")
* @property {number} size - The size of the media file in bytes
* @property {string} formattedSize - The formatted size of the media file (e.g., "8.62 MB", "242.57 KB")
* @property {boolean} videoAvailable - Whether the media file contains video
* @property {boolean} audioAvailable - Whether the media file contains audio
* @property {boolean} chunked - Whether the media file is chunked
* @property {boolean} cached - Whether the media file is cached
*/
/**
* @typedef {Object} TiktokVideo
* @property {?string} error - The error message
* @property {string} url - The URL of the video
* @property {string} title - The title of the video
* @property {string} thumbnail - The URL of the video thumbnail
* @property {string} duration - The duration of the video (e.g., "00:15")
* @property {string} source - The source of the video (e.g., "tiktok")
* @property {Media[]} medias - An array of media files associated with the video
* @property {?string} sid - The session ID associated with the video (can be null)
*/
```

# Usage example
```js
const dt = require("downloadTiktok")

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
```
