# This library uses https://save-from.com/ !

**Nodejs** library that can download videos from **TikTok without watermark**

- This is my first npm project do not judge strictly

# Dependencies
- NodeJs

# Documentation
- **photos** : video or photo? false/true
- **thumbnail** video wallpaper. link
- **title** : video descriptions. string
- **watermark** : video with watermark. link
- **video** : video without a watermark. link
- **music** : music from video. link
- **id** : video id. numbers

# example 1
```js
const { downloadTiktok } = require("downloadTiktok")

const data = await downloadTiktok('https://vm.tiktok.com/ZMYTkTEBv/')
console.log(data)
```
# example 2
```js
const { downloadTiktok } = require("downloadTiktok")

downloadTiktok('https://vm.tiktok.com/ZMYTkTEBv/').then(data => {
	console.log(data)
})
```
