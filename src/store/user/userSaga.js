import { call, put, takeLatest } from "redux-saga/effects";
import userTypes from "@store/user/userTypes.js";

function* fetchUserPcId() {
  try {
    const data = yield call(
      window.electron.fetchData,
      `SELECT Interval.pc_id as pcId 
       FROM Interval
       LIMIT 1;`
    );
    const { pcId } = data[0];
    yield put({ type: userTypes.setUserPcId, payload: pcId || "" });
  } catch (error) {
    yield put({ type: userTypes.setUserPcId, payload: "" });
  }
}

const userSaga = [takeLatest(userTypes.fetchUserPcId, fetchUserPcId)];

export default userSaga;
