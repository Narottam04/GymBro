import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import exerciseService from "./exerciseService"

export const allExercise = createAsyncThunk('exercise/fetchAllExercise',async(props,thunkAPI) => {
    try {   
        const {page,limit} = props
        const token = thunkAPI.getState().auth.user.token
        return await exerciseService.fetchAllExercise(token,page,limit)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const searchExercise = createAsyncThunk('exercise/searchExercise', async(search,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await exerciseService.searchExercise(token,search)
    } catch (error) {
        const message = (error.response && error.response.data && error.resonse.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const initialState = {
    exercise: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers:(builder) => {
        builder.addCase(allExercise.pending,(state)=> {
            state.isLoading = true
        })
        .addCase(allExercise.fulfilled,(state,action) => {
            state.isLoading = false
            state.isSuccess = true
            state.exercise = action.payload
        })
        .addCase(allExercise.rejected, (state,action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.exercise = {}
        })
        .addCase(searchExercise.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(searchExercise.fulfilled, (state,action)=> {
            state.isLoading = false
            state.isSuccess = true
            state.exercise = action.payload
        })
        .addCase(searchExercise.rejected, (state,action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.exercise = {}
        })
    }
})

export const {reset} = exerciseSlice.actions
export default exerciseSlice.reducer