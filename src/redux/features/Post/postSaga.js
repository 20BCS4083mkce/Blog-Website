import { call, put, takeLatest,select} from 'redux-saga/effects';
import Cookies from 'js-cookie';
import axios from 'axios';
import {fetchPost, fetchPostFailure, fetchPostSuccess, fetchAllPost, fetchAllPostComplete} from '../Post/postSlice';

function* fetchPostSaga(action) {
    const token = Cookies.get('token');
    const searchValue = action.payload;

    try {
        let url = 'https://react-assignment-api.mallow-tech.com/api/posts';

        if (searchValue) {
            url += `?limit=10&page=1&sort=name&order=asc&search=${searchValue}`;
        }
        else {
            const currentpage = yield select((state) => state.post.page || 1);
            url += `?limit=10&page=${currentpage}&sort=name&order=asc`;
        }


        const response = yield call(axios.get, url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            if (searchValue) {
                yield put(fetchPostSuccess(response.data));
            }
            else {
                if(response.data.data.length>0) {
                    yield put(fetchAllPost(response.data));
                }
                else {
                    yield put(fetchAllPostComplete())
                }
            }
        } else {
            yield put(fetchPostFailure(response.data));
        }
    } catch (error) {
        yield put(fetchPostFailure());
    }
}

function* postSaga() {
    yield takeLatest(fetchPost, fetchPostSaga);
}

export default postSaga;
