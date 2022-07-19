const asyncHandler = require('express-async-handler')
const yt = require("youtube-search-without-api-key")

// @desc GET Workout Releated Videos
// @route GET /api/ytvideo?search="bicep"
// @access PRIVATE
const getYtVideo = asyncHandler(async(req,res) => {
    const search = req.query.search
    if(!search) {
        res.status(400)
        throw new Error('Please add search query for video.')
    }

    const videos = await yt.search(search);

    res.json(videos)
})

module.exports = {
    getYtVideo
}