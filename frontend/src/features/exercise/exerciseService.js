import axios from 'axios'

const API_URL = '/api/exercise'

// fetch all exercise
const fetchAllExercise = async(token,page,limit) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + `?page=${page}&limit=${limit}`,config)

    return res.data
}

// search exercise
const searchExercise = async(token,search) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + `/search/${search}`,config)

    return res.data
}

const exerciseService = {
    fetchAllExercise,
    searchExercise
}

export default exerciseService