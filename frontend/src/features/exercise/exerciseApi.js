import {createApi,fakeBaseQuery,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

export const exerciseApi = createApi({
    reducerPath: "exerciseApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getExercise: builder.query({
            queryFn: async(args) => {
                const {page,limit,search,token} = args

                const config = {
                     headers: {
                         Authorization: `Bearer ${token}`
                     }
                 }

                 if(!search){
                    try {
                        const url = `http://localhost:5000/api/exercise?limit=${limit}&page=${page}`
   
                        const response = await axios.get(url,config)
   
                        return {data: response.data}
                    } catch (error) {
                        const message = (error.response && error.response.data && error.resonse.data.message) || error.message || error.toString()
                         return {error: message}
                    }

                 }else{
                    try {
                        const url = `http://localhost:5000/api/exercise/search/${search}`

                        const response = await axios.get(url,config)
   
                        return {data: response.data}
                    } catch (error) {
                        const message = (error.response && error.response.data && error.resonse.data.message) || error.message || error.toString()

                        return {error: message}
                    }
                 }
            }
        }),
        getRelatedExercise: builder.query({
            queryFn: async(args) => {
                try {
                    const {bodyPart,token} = args
                    
                    const url = `http://localhost:5000/api/exercise?limit=8&filterBy=bodyPart&value=${bodyPart}&page=1`
                    
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                    const response = await axios.get(url,config)
                
                    return {data: response.data}


                } catch (error) {
                    const message = (error.response && error.response.data && error.resonse.data.message) || error.message || error.toString()
                    return {error: message}
                }
            }
        })
    })
})

export const {useGetRelatedExerciseQuery,useGetExerciseQuery} = exerciseApi