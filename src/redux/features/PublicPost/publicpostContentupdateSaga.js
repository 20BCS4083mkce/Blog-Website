import { setPostdetailsSuccess,setPostdetailsupdate} from "./publicpostSlice";
import {put, takeLatest} from 'redux-saga/effects';
function* fetchPostContentnewSaga(action)
{
    const user=action.payload;
    yield put(setPostdetailsSuccess(user));
}
function* publicpostContentupdateSaga() {

    yield takeLatest(setPostdetailsupdate,fetchPostContentnewSaga)
}

export default publicpostContentupdateSaga;
