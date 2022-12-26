import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import computerService from './computerService'

const initialState = {
    computers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new computer
export const createComputer = createAsyncThunk(
    'computers/create',
    async (computerData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await computerService.createComputer(computerData, token)
        } catch (error) {
            const message = 
            (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get all computers
export const getAllComputers = createAsyncThunk (
    'computers/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await computerService.getAllComputers(token)
        } catch (error) {
            const message = 
            (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get available computers
export const getAvailableComputers = createAsyncThunk (
    'computers/getAvailable',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await computerService.getAvailableComputers(token)
        } catch (error) {
            const message = 
            (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteComputer = createAsyncThunk(
    'computers/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await computerService.deleteComputer(id,token)
        } catch (error) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            return thunkAPI.rejectWithValue(message)
          }
    }
)

export const computerSlice = createSlice({
    name: 'computer',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
          },
        //reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createComputer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createComputer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //state.computers.push(action.payload)
                state.computers = action.payload
            })
            .addCase(createComputer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllComputers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllComputers.fulfilled, (state, action) => {
                state.isLoading = false
                //state.isSuccess = true
                state.computers = action.payload
            })
            .addCase(getAllComputers.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAvailableComputers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAvailableComputers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.computers = action.payload
            })
            .addCase(getAvailableComputers.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteComputer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteComputer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.computers = state.computers.filter(
                    (computer) => computer._id !== action.payload.id
                )
            })
            .addCase(deleteComputer.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {reset} = computerSlice.actions
export default computerSlice.reducer