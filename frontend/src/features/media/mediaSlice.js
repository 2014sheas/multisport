import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import mediaService from './mediaService';

const initialState = {
    media: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Get all posts
export const getMedia = createAsyncThunk('media/getAll', async (_, thunkAPI) => {
    try {
        return await mediaService.getMedia();
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
});



export const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers:{
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getMedia.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMedia.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.media = action.payload
        })
        .addCase(getMedia.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.media = action.payload;
        })
    }
})


export const {reset} = mediaSlice.actions;
export default mediaSlice.reducer;