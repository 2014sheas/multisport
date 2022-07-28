import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/events/eventSlice'
import teamReducer from '../features/teams/teamSlice'

export const store = configureStore({
  reducer: {
    events: eventReducer,
    teams: teamReducer,
  },
});
