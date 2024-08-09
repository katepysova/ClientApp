import { all } from "redux-saga/effects";
import dateSaga from "@store/date/dateSaga.js";
import userSaga from "@store/user/userSaga.js";

export default function* rootSaga() {
  yield all([...dateSaga, ...userSaga]);
}
