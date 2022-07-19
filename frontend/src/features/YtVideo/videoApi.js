import {createApi,fakeBaseQuery,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios'

export const videoApi = createApi({
    reducerPath: "videoApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        fetchVideos: builder.query({
            queryFn: async(args) => {
                try {
                    const {search,token} = args
                    const url = `http://localhost:5000/api/ytvideo/?search=${search}`
                    
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

export const {useFetchVideosQuery} = videoApi