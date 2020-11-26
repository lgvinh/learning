import { takeEvery, put } from "redux-saga/effects";

function* signinAsync({payload}) {
  console.log("saga is running", payload);
  yield put({type: "SIGNIN_ASYNC", payload});
}

export function* watchSignin() {
  yield takeEvery("SIGNIN", signinAsync);
}