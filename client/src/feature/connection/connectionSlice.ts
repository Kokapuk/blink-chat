import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ConnectionState {
  room: string | null;
}

const initialState: ConnectionState = {
  room: null,
};

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setConnection: (state, { payload: connection }: PayloadAction<{ room: string }>) => {
      state.room = connection.room;
    },
  },
});

export const { setConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
