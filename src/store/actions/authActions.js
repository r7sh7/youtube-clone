import { auth, provider } from "../../config/firebase";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../constants";

export const login = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    auth
      .signInWithPopup(provider)
      .then((res) => {
        const accessToken = res.credential.accessToken;
        const profile = {
          name: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
        };

        sessionStorage.setItem("ytc-access-token", accessToken);
        sessionStorage.setItem("ytc-user", JSON.stringify(profile));

        dispatch({ type: LOGIN_SUCCESS, payload: { accessToken, profile } });
      })
      .catch((err) => dispatch({ type: LOGIN_FAILURE, payload: err.message }));
  };
};

export const logout = (dispatch) => {
  return (dispatch) => {
    auth.signOut().then(() => {
      dispatch({ type: LOGOUT });
      sessionStorage.removeItem("ytc-access-token");
      sessionStorage.removeItem("ytc-user");
    });
  };
};
