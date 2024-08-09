import { call, put, takeLatest } from "redux-saga/effects";
import dateTypes from "@store/date/dateTypes.js";

function* fetchLastUpdatedDate() {
  try {
    const data = yield call(
      window.electron.fetchData,
      `SELECT 
       MAX(Interval.start_time) as lastUpdated
       FROM Interval`
    );
    let { lastUpdated } = data[0];
    yield put({
      type: dateTypes.setLastUpdatedDate,
      payload: lastUpdated ? new Date(lastUpdated) : null
    });
  } catch (error) {
    yield put({ type: dateTypes.setLastUpdatedDate, date: null });
  }
}

function* fetchMinDate() {
  try {
    const data = yield call(
      window.electron.fetchData,
      `SELECT 
       MIN(Interval.start_time) as minDate
       FROM Interval;`
    );
    const { minDate } = data[0];
    yield put({ type: dateTypes.setMinDate, payload: minDate ? new Date(minDate) : null });
  } catch (error) {
    yield put({ type: dateTypes.setMinDate, payload: null });
  }
}

const dateSaga = [
  takeLatest(dateTypes.fetchLastUpdatedDate, fetchLastUpdatedDate),
  takeLatest(dateTypes.fetchMinDate, fetchMinDate)
];
export default dateSaga;
