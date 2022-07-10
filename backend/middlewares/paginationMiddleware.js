const asyncHandler = require('express-async-handler')


function paginatedResults(model) {
    return asyncHandler(async(req,res,next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        if(!Boolean(page && limit)){
            res.status(400)
            throw new Error('Please add page and limit query paramaters for paginated response')
        }

        const filterBy = req.query.filterBy
        const value = req.query.value

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        let totalRows

        if(Boolean(filterBy && value)){
            totalRows = await model.count({
                where: {
                    [filterBy] : value
                }
            })
        }else{
            totalRows = await model.count()
        }

        if(endIndex < totalRows){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        results.max = {
            totalExercise: totalRows,
            maxPages: Math.floor((totalRows + limit - 1) /limit)
        }

        if(Boolean(filterBy && value)){
            results.data = await model.findAll({
                where: {
                    [filterBy] : value
                },
                limit,
                offset: startIndex
            })
        }else{
            results.data = await model.findAll({
                limit,
                offset: startIndex
            })
        }

        res.paginatedResults = results
        next()

    })
}

module.exports = {
    paginatedResults
}