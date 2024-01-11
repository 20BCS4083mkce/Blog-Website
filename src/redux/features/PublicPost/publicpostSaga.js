import { call, put, select, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
    fetchPublicPost,
    fetchPublicPostAllPost,
    fetchPublicPostFailure,
    fetchPublicPostSuccess, setPostdetailContentSuccess, setPostdetailsSuccess,
} from './publicpostSlice';

function* fetchPublicPostSaga(action) {
    const token = Cookies.get('token');
    const searchValue = action.payload;

    try {
        const currentOffset = yield select((state) => state.publicpost.offset || 1);

        let url = 'https://react-assignment-api.mallow-tech.com/api/public/posts';
        if (searchValue) {
            url += `?search=${searchValue}`;
        } else {
            url += `?offset=${currentOffset}&search`;
        }

        const response = yield call(axios.get, url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            if (searchValue) {
                yield put(fetchPublicPostSuccess(response.data));
            } else
            {
                yield put(fetchPublicPostAllPost(response.data));
                if(currentOffset===1) {
                    const res = response.data[0];
                    yield put(setPostdetailsSuccess(res));
                    console.log(res.id);
                }

            }
        } else {
            yield put(fetchPublicPostFailure(response.data));
        }
    } catch (error) {
        yield put(fetchPublicPostFailure());
    }
}

function* publicpostSaga() {
    yield takeLatest(fetchPublicPost, fetchPublicPostSaga);
}

export default publicpostSaga;


