const { request, fetch } = require('undici');
const querystring = require("querystring");
const { Buffer } = require('buffer');

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

const apiUrl = 'https://snapdouyin.app/wp-json/aio-dl/video-data/'

const headers = {
	"content-type": "application/x-www-form-urlencoded",
}

/**
 * 
 * @public
 * @example
 * // Receives a response from the server
 * const result = await dt.downloadTiktok(url)
 * @param {string} url 
 * @returns {Promise<TiktokVideo>}
 */
async function downloadTiktok(url) {
	try {
		const options = querystring.stringify({ url });

		const response = await request(apiUrl, { method: "POST", body: options, headers })

		// @ts-expect-error How to do it properly without resorting to ts?
		return await response.body.json()
	} catch (error) {
		throw new Error(`An error occurred: ${error.message}`);
	}
}

/**
 * Get the buffer from the link
 * @public
 * @example
 * // Receives a response from the server
 * const result = await dt.downloadTiktok(url)
 * // Get the buffer
 * const buffer = dt.getBufferFromURL(result.medias[0].url)
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
async function getBufferFromURL(url) {
	try {
		const response = await fetch(url);

		const buffer = Buffer.from(await response.arrayBuffer());

		return buffer;
	} catch (error) {
		throw new Error(`An error occurred: ${error.message}`);
	}
}

/**
 * Useful when you need to send a video to discord/telegram
 * @public
 * @example 
 * // Receives a response from the server
 * const result = await dt.downloadTiktok(url)
 * // Get the best content in a limited size
 * // 50 * 1024 * 1024 is 52428800 bytes or 50 megabytes
 * const bestMedia = dt.getBestMediaWithinLimit(result.medias, 50 * 1024 * 1024)
 * @param {Media[]} medias 
 * @param {number} limitedSizeBytes 
 * @returns {Media}
 */
function getBestMediaWithinLimit(medias, limitedSizeBytes) {
	return medias.filter(media => media.size <= limitedSizeBytes)
		.sort((a, b) => b.size - a.size)[0] || null
}

/**
 * Get the videos without the watermark
 * @public
 * @example
 * // Receives a response from the server
 * const result = await dt.downloadTiktok(url)
 * // Get videos without watermark
 * const noWatermark = dt.filterNoWatermark(result.medias)
 * @param {Media[]} medias 
 * @returns {Media[]}
 */
function filterNoWatermark(medias) {
	return medias.filter(media => media.quality !== 'watermark')
}

/**
 * Get videos only
 * @public
 * @example
 * // Receives a response from the server
 * const result = await dt.downloadTiktok(url)
 * // Get videos
 * const noWatermark = dt.filterVideo(result.medias)
 * @param {Media[]} medias 
 * @returns {Media[]}
 */
function filterVideo(medias) {
	return medias.filter(media => media.videoAvailable && media.audioAvailable)
}

/**
 * Get audios only
 * @public
 * @example
 * // Receives a response from the server
 * const result = await dt.downloadTiktok(url)
 * // Get audios
 * const noWatermark = dt.filterAudio(result.medias)
 * @param {Media[]} medias 
 * @returns {Media[]}
 */
function filterAudio(medias) {
	return medias.filter(media => !media.videoAvailable && media.audioAvailable)
}

module.exports = { downloadTiktok, getBufferFromURL, getBestMediaWithinLimit, filterNoWatermark, filterVideo, filterAudio }