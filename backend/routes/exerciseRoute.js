const express = require('express')
const { getExercise, getBodyPartList, getTargetMusclesList, getEquipmentList, getSearchResult, getExerciseById } = require('../controllers/exerciseControllers')
const { paginatedResults } = require('../middlewares/paginationMiddleware')

// exercise model
const Exercise = require('../models/exercise')

const router = express.Router()

// Get Exercise
router.get('/',paginatedResults(Exercise), getExercise)

// Get Exercise by id
router.get('/:id', getExerciseById)

// Get BodyParts
router.get('/bodyPartList',getBodyPartList)

// Get Target Muscles List
router.get('/targetMusclesList',getTargetMusclesList)

// Get Equipments List
router.get('/equipmentList',getEquipmentList)

// Get Search Exercise
router.get('/search/:search',getSearchResult)


module.exports = router