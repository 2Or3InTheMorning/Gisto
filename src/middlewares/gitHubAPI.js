import * as API from 'superagent';
import * as AT from 'constants/actionTypes';
import { DEFAULT_API_ENDPOINT_URL } from 'constants/config';

const _headers = (additional) => ({
  'Content-Type': 'application/json',
  Authorization: 'token 269c6ce4acff14c5e8e9dc787d35e35daed1fa5f',
  ...additional
});

const gitHubAPIMiddleware = ({ dispatch }) => {
  return (next) => (action) => {

    if (action.type === AT.GET_USER) {
      dispatch({ type: AT.GET_USER.PENDING, action });
      API.get(`${DEFAULT_API_ENDPOINT_URL}/user`)
        .set(_headers())
        .end((error, result) => {
          if (error) {
            dispatch({
              type: AT.GET_USER.FAILURE,
              payload: error
            });
          }
          if (!error && result) {
            dispatch({ type: AT.GET_USER.SUCCESS, payload: result.body });
          }
        });
    }

    if (action.type === AT.GET_STARRED_SNIPPETS) {
      dispatch({ type: AT.GET_STARRED_SNIPPETS.PENDING, action });

      return API.get(`${DEFAULT_API_ENDPOINT_URL}/gists/starred`)
        .set(_headers())
        .end((error, result) =>
          dispatch({ type: AT.GET_STARRED_SNIPPETS.SUCCESS, payload: result.body }));
    }

    if (action.type === AT.GET_SNIPPETS) {
      dispatch({ type: AT.GET_SNIPPETS.PENDING, action });

      const getGists = (page) => API.get(`${DEFAULT_API_ENDPOINT_URL}/gists?page=${page}&per_page=100`)
        .set(_headers())
        .end((error, result) => {
          if (error) {
            dispatch({
              type: AT.GET_SNIPPETS.FAILURE,
              payload: error
            });
          }
          if (!error && result) {
            dispatch({
              type: AT.GET_SNIPPETS.SUCCESS,
              payload: result.body
            });
          }
          if (result.headers.link && result.headers.link.match(/next/ig)) {
            getGists(page + 1);
          }
        });

      getGists(1);
    }

    if (action.type === AT.GET_SNIPPET) {
      dispatch({ type: AT.GET_SNIPPET.PENDING, action });

      return API.get(`${DEFAULT_API_ENDPOINT_URL}/gists/${action.payload.id}`)
        .set(_headers())
        .end((error, result) => {
          if (error) {
            dispatch({
              type: AT.GET_SNIPPET.FAILURE,
              payload: error
            });
          }
          if (!error && result) {
            dispatch({
              type: AT.GET_SNIPPET.SUCCESS,
              payload: result.body
            });
          }
        });
    }

    if (action.type === AT.SET_STAR) {
      dispatch({ type: AT.SET_STAR.PENDING, action });

      return API.put(`${DEFAULT_API_ENDPOINT_URL}/gists/${action.payload.id}/star`)
        .set(_headers({ 'Content-Length': 0 }))
        .end((error, result) => {
          if (error || result.status !== 204) {
            dispatch({
              type: AT.SET_STAR.FAILURE,
              payload: error
            });
          }
          if (!error && result.status === 204) {
            dispatch({
              type: AT.SET_STAR.SUCCESS,
              meta: action.meta
            });
          }
        });
    }

    if (action.type === AT.UNSET_STAR) {
      dispatch({ type: AT.UNSET_STAR.PENDING, action });

      return API.delete(`${DEFAULT_API_ENDPOINT_URL}/gists/${action.payload.id}/star`)
        .set(_headers())
        .end((error, result) => {
          if (error || result.status !== 204) {
            dispatch({
              type: AT.UNSET_STAR.FAILURE,
              payload: error
            });
          }
          if (!error && result.status === 204) {
            dispatch({
              type: AT.UNSET_STAR.SUCCESS,
              meta: action.meta
            });
          }
        });
    }

    if (action.type === AT.CREATE_SNIPPET) {
      dispatch({ type: AT.CREATE_SNIPPET.PENDING, action });
      API.post(`${DEFAULT_API_ENDPOINT_URL}/gists`)
        .set(_headers())
        .send(JSON.stringify(action.payload))
        .end((error, result) => {
          if (result.statusCode === 201) {
            dispatch({
              type: AT.CREATE_SNIPPET.SUCCESS,
              meta: action.meta,
              payload: result.body
            });
          }
        });
    }

    next(action);
  };
};

export default gitHubAPIMiddleware;