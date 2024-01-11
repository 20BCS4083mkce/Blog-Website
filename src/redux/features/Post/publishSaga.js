import { call, put, takeLatest} from 'redux-saga/effects';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
    publishPost,
    publishPostSuccess,
    publishPostFailure
} from '../Post/postSlice';

function* publishPostSaga(action) {
    const token = Cookies.get('token');
    const id = action.payload.id;
    const bool=!(action.payload.is_published);
    try {
        const response = yield call(axios.post, `https://react-assignment-api.mallow-tech.com/api/posts/${id}/publish/${bool}`,bool, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            yield put(publishPostSuccess(response.data));
        } else {
            yield put(publishPostFailure(response.data));
        }
    } catch (error) {
        yield put(publishPostFailure());
    }
}

function* publishSaga() {
    yield takeLatest(publishPost, publishPostSaga);
}

export default publishSaga;
