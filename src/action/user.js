import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REQUEST,
  LOGIN_SAGA
} from "./const";
import LoginService from "../service/login";
// export const login = () => ({
//  type: LOGIN_SUCCESS
// });
//!方法2：async await优点就是简单，本质上还是generator，只是没有generator强大
// export function login(userInfo) {
//   return async function(dispatch) {
//     dispatch({ type: REQUEST });
//     console.log(userInfo)
//     const res1 = await loginPromise(dispatch, userInfo);
//     if (res1) {
//       getMoreUserInfo(dispatch, res1);
//     }
//   };
// }
// ! 异步方法1：redux-thunk
//  redux-thun 缺点就是 容易形成嵌套地狱
// export const login = userInfo => dispatch => {
//  dispatch({type: REQUEST});
//  LoginService.login(userInfo).then(
//   res => {
//    // dispatch({
//    //  type: LOGIN_SUCCESS,
//    //  payload: {...userInfo, ...res}
//    // });
//    getMoreUserInfo(dispatch, {...userInfo, ...res});
//    return res;
//   },
//   err => {
//    dispatch({type: LOGIN_FAILURE, payload: err});
//   }
//  );
// };
export const loginPromise = (dispatch, userInfo) => {
  return LoginService.login(userInfo).then(
    res => {
      return res;
    },
    err => {
      dispatch({ type: LOGIN_FAILURE, payload: err });
    }
  );
};
const getMoreUserInfo = (dispatch, userInfo) => {
  return LoginService.getMoreUserInfo(userInfo).then(
    res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...userInfo, ...res }
      });
      return res;
    },
    err => {
      dispatch({ type: LOGIN_FAILURE, payload: err });
    }
  );
};

// !方法3：redux-saga
export const login = userInfo => ({type: LOGIN_SAGA, payload: userInfo});

export const logout = () => ({
  type: LOGOUT_SUCCESS
});
