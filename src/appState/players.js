import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import {
  NEW_POST,
  USERS_ERROR,
  DELETE_POST,
  MODIFY_POST,
  GET_USER,
} from './types';
import axios from 'axios';

const adapter = createEntityAdapter();

export const {
  selectById: getPlayerById,
  selectAll: getPlayers,
  selectEntities: getPlayerEntities,
  selectIds: getPlayerIds,
  selectTotal: getTotalPlayers,
} = adapter.getSelectors((state) => state.players);

const headers = new Headers({
  'Content-Type': 'application/json',
});

export const fetchAllPlayers = createAsyncThunk(
  'players/fetchAll',
  async () => {
    const response = await fetch('/api/players', { headers });
    const json = await response.json();

    return json;
  }
);

//CHECK THE CONTROLLER.TS

//My own fetch but not using...
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/players', { headers });
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
    //console.log(res);
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const addUsers = (postData) => async (dispatch) => {
  //console.log('Data from Component: ',postData);
  /*
DATA from json format

"1547cbe1-e06a-417e-97dc-ce1de248d4e9": {
  "id": "1547cbe1-e06a-417e-97dc-ce1de248d4e9",
  "name": "Daanyaal Hyde",
  "country": "EC",
  "winnings": 2903,
  "imageUrl": "https://i.pravatar.cc/40?u=1547cbe1-e06a-417e-97dc-ce1de248d4e9"
},*/

  try {
    const res = await axios.post('/api/players', postData, { headers });
    dispatch({
      type: NEW_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
    console.log(error);
  }
};
export const deleteUSer = (postData) => async (dispatch) => {
  console.log('Data from Component: ', postData);

  //CONTROLLER
  //async delete(playerId: string):

  try {
    const res = await axios.delete(`/api/players/${postData}`, { headers });
    dispatch({
      type: DELETE_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const modifyUser = (passThisId, postData) => async (dispatch) => {
  console.log('Data from modify: ', passThisId, postData);

  try {
    const res = await axios.put(`/api/players/${passThisId}`, postData, {
      headers,
    });
    dispatch({
      type: MODIFY_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const PLAYERS_INITIAL_STATE = adapter.getInitialState();

const { actions, reducer } = createSlice({
  name: 'players',
  initialState: PLAYERS_INITIAL_STATE,
  extraReducers: (builder) =>
    builder.addCase(fetchAllPlayers.fulfilled, (state, action) => {
      adapter.setAll(state, action.payload.items);
    }),
});

export const {
  // any actions
} = actions;

export default reducer;
