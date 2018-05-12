const axios = require('axios')
const { performance } = require('perf_hooks')

let axiosInstance = axios.create({
    baseURL: "https://api.figma.com/v1/",
    headers: {
        "X-Figma-Token": "1181-e9b3dee4-1ea6-497e-b254-867f6791075e"
    }
})

module.exports = {
    async getFrames(key) {
        let response = await axiosInstance.get(`files/${key}`)
        let frames = response.data.document.children[0].children
            .filter(child => child.type == "FRAME");
        return this.getFramesWithImages(frames, key)
    },
    async getFramesWithImages(frames, key) {
        let start = performance.now()
        let response = await axiosInstance.get(`images/${key}`, {
            params: {
                ids: frames.map(frame => frame.id).join(','),
                format: "svg"
            }
        })

        for (let frame of frames) {
            frame.imageUrl = response.data.images[frame.id]
        }


        let end = performance.now()

        console.log(`Done in ${end - start} ms`)


        return frames
    }
}