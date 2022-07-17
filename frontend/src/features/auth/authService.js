import axios from 'axios'

const API_URL = '/api/users/'

// login user
const login = async(userData) => {
    const res = await axios.post(API_URL + 'login',userData)

    if(res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    logout,
    login
}

export default authService