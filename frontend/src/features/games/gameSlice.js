import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import gameService from './gameService';

const initialState = {
    games: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create new game
export const createGame = createAsyncThunk('game/create', 
async (gameData, thunkAPI) => {

     try {
         return await gameService.createGame(gameData);
     } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
     }
})

//Get all games
export const getGames = createAsyncThunk('games/getAll', async (_, thunkAPI) => {
    try {
        return await gameService.getGames();
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

// Update a game
export const updateGame = createAsyncThunk('games/update', 
async (id, gameData, thunkAPI) => {
     try {
         return await gameService.updateGame(id, gameData);
     } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
     }
})

// Delete game
export const deleteGame = createAsyncThunk('games/delete', 
async (id, thunkAPI) => {
     try {
         return await gameService.deleteGame(id);
     } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
     }
})

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers:{
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
        .addCase(getGames.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getGames.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.games = action.payload
        })
        .addCase(getGames.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(createGame.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createGame.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.games = action.payload
        })
        .addCase(createGame.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(deleteGame.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteGame.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.games = action.payload
        })
        .addCase(deleteGame.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

    }
})


export const {reset} = gameSlice.actions;
export default gameSlice.reducer;