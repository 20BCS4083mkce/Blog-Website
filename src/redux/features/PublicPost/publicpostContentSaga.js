import { call, put, takeLatest,select} from 'redux-saga/effects';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
    setPostdetailContentSuccess,
    setPostdetails,
    setPostdetailsFailure,
} from "./publicpostSlice";

function* fetchPostContentSaga(action) {
    const token = Cookies.get('token');


    try {
        const id = yield select((state) => state.publicpost.id);
        let url = `https://react-assignment-api.mallow-tech.com/api/public/posts/${id}`;



        const response = yield call(axios.get, url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            yield put(setPostdetailContentSuccess(response.data));
        }
    } catch (error) {
         yield put(setPostdetailsFailure());
    }
}


function* publicpostContentSaga() {
    yield takeLatest(setPostdetails, fetchPostContentSaga);
}

export default publicpostContentSaga;
