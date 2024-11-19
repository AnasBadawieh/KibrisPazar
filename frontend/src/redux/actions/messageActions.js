import axios from 'axios';
import {
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_SEND_FAIL,
} from '../constants/messageConstants';

export const getMessages = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: MESSAGE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/messages/${userId}`, config);

    dispatch({ type: MESSAGE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MESSAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendMessage = (message) => async (dispatch, getState) => {
  try {
    dispatch({ type: MESSAGE_SEND_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/messages', message, config);

    dispatch({ type: MESSAGE_SEND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MESSAGE_SEND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};