import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import eventService from './eventService';

const initialState = {
    events: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Get all events
export const getEvents = createAsyncThunk('events/getAll', async (_, thunkAPI) => {
    try {

        return await eventService.getEvents();
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



export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers:{
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getEvents.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getEvents.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.events = action.payload
        })
        .addCase(getEvents.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})


export const {reset} = eventSlice.actions;
export default eventSlice.reducer;