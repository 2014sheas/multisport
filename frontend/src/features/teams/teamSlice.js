import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import teamService from './teamService';

const initialState = {
    teams: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Get all teams
export const getTeams = createAsyncThunk('teams/getAll', async (_, thunkAPI) => {
    try {

        return await teamService.getTeams();
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




export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers:{
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getTeams.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getTeams.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.teams = action.payload
        })
        .addCase(getTeams.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})


export const {reset} = teamSlice.actions;
export default teamSlice.reducer;