const express = require('express')

const { getExercise, getBodyPartList, getTargetMusclesList, getEquipmentList, getSearchResult, getExerciseById } = require('../controllers/exerciseControllers')
const { protect } = require('../middlewares/authMiddleware')
const { paginatedResults } = require('../middlewares/paginationMiddleware')

// exercise model
const Exercise = require('../models/exercise')

const router = express.Router()

// Get Exercise
router.get('/', protect, paginatedResults(Exercise), getExercise)

// Get BodyParts
router.get('/bodyPartList', protect , getBodyPartList)

// Get Target Muscles List
router.get('/targetMusclesList', protect, getTargetMusclesList)

// Get Equipments List
router.get('/equipmentList', protect ,getEquipmentList)

// Get Exercise by id
router.get('/:id', protect, getExerciseById)

// Get Search Exercise
router.get('/search/:search', protect, getSearchResult)




module.exports = router