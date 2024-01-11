import { call, put, takeLatest} from 'redux-saga/effects';
import Cookies from 'js-cookie';
import axios from 'axios';
import {deletePost,deletePostSuccess,deletePostFailure} from '../Post/postSlice';

function* deleteSaga(action) {
    const token = Cookies.get('token');
    const id = action.payload;
    console.log(id);
    try {
        let url =`https://react-assignment-api.mallow-tech.com/api/posts/${id}`;
        const response = yield call(axios.delete, url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            yield put(deletePostSuccess(response.data))
        } else {
            yield put(deletePostFailure(response.data));
        }
    } catch (error) {
        yield put(deletePostFailure());
    }
}

function* postDeleteSaga() {
    yield takeLatest(deletePost, deleteSaga);
}

export default postDeleteSaga;
