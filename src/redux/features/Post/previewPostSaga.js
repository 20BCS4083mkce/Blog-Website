import { call, put, takeLatest} from 'redux-saga/effects';
import Cookies from 'js-cookie';
import axios from 'axios';
import {previewPostSuccess, previewPostFailure, previewPost} from '../Post/postSlice';

function* previewSaga(action) {
    const token = Cookies.get('token');
    const id = action.payload.id;

    try {
        let url =`https://react-assignment-api.mallow-tech.com/api/posts/${id}`;
        const response = yield call(axios.get, url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            yield put(previewPostSuccess(response.data))
        } else {
            yield put(previewPostFailure(response.data));
        }
    } catch (error) {
        yield put(previewPostFailure());
    }
}

function* previewPostSaga() {
    yield takeLatest(previewPost, previewSaga);
}

export default previewPostSaga;
