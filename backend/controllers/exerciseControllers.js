const asyncHandler = require('express-async-handler')
const { Op } = require("sequelize");
const sequelize = require('sequelize');
const Exercise = require('../models/exercise')

// @desc GET exercise *** used custom pagination middleware
// @route GET /api/exercise?filterBy=''&value=''&page=''&limit=''
// @access PRIVATE
const getExercise = asyncHandler(async(req,res) => {
    res.json(res.paginatedResults)
})

// @desc GET exercise by id
// @route GET /api/exercise/:id
// @access PRIVATE
const getExerciseById = asyncHandler(async(req,res) => {
    const exercise = await Exercise.findByPk(req.params.id)

    res.json(exercise)
})

// @desc GET bodyPartList
// @route GET /api/exercise/bodyPartList
// @access PRIVATE
const getBodyPartList = asyncHandler(async(req,res) => {
    const bodyParts = await Exercise.aggregate('bodyPart', 'DISTINCT', { plain: false })

    // const bodyParts = await Exercise.findAll({
    //     attributes: [[sequelize.fn('DISTINCT', sequelize.col('bodyPart')), 'bodyPart']]
    // })

    const bodyPartsArr = bodyParts.map((item) => item.DISTINCT)

    res.json(bodyPartsArr)
})

// @desc GET targetMusclesList
// @route GET /api/exercise/targetMusclesList
// @access PRIVATE
const getTargetMusclesList = asyncHandler(async(req,res) => {
    const targetMuscles = await Exercise.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('target')), 'target']]
    })

    targetMusclesArr = targetMuscles.map((item) => item.target)

    res.json(targetMusclesArr)
})

// @desc GET equipmentList
// @route GET /api/exercise/equipmentList
// @access PRIVATE
const getEquipmentList = asyncHandler(async(req,res) => {
    const equipment = await Exercise.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('equipment')), 'equipment']]
    })

    equipmentArr = equipment.map((item) => item.equipment)

    res.json(equipmentArr)
})

// @desc GET search
// @route GET /api/exercise/search/:search
// @access PRIVATE
const getSearchResult = asyncHandler(async(req,res) => {
    const search = await Exercise.findAll({
        where: {
            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.params.search + '%')
        },
        limit: 10
    })

    res.json({data: search})
})


module.exports = {
    getExercise,
    getBodyPartList,
    getTargetMusclesList,
    getEquipmentList,
    getSearchResult,
    getExerciseById
}