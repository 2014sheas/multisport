import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/events/eventSlice'
import teamReducer from '../features/teams/teamSlice'
import authReducer from '../features/auth/authSlice'
import gameReducer from '../features/games/gameSlice'
import mediaReducer from '../features/media/mediaSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    teams: teamReducer,
    games: gameReducer,
    media: mediaReducer,
  },
});
