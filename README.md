# This library uses https://save-from.com/ !

**Nodejs** library that can download videos from **TikTok without watermark**

- This is my first npm project do not judge strictly

# Dependencies
- NodeJs

# Documentation
- **timestamp** : video creation time in ms
- **duration** : video duration 00:10
- **quality** : quality array ['1080', '360']
- **status** : HTTPS status
- **source** : video source (link)
- **title** : video title
- **video** : video url
- **audio** : audio url
- **thumb** : video thumb url
- **sd** : SD video url
- **hd** : HD video url

# example 1
```js
const { tt_downloader } = require("tt_downloader")

const data = await tt_downloader('https://vm.tiktok.com/ZMYTkTEBv/')
	console.log(data)
```
# example 2
```js
const { tt_downloader } = require("tt_downloader")

tt_downloader('https://vm.tiktok.com/ZMYTkTEBv/').then(data => {
		console.log(data)
})
```
