import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import Cookies from 'js-cookie';
import {createPost, createPostFailure, createPostSuccess} from "./postSlice";

function* createSaga(action) {
    try {
        const { name, image, content } = action.payload;
        const token = yield call(Cookies.get, 'token');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('content', content);
        formData.append('image', image.fileList[0].originFileObj);
        const response = yield call(axios.post, 'https://react-assignment-api.mallow-tech.com/api/posts', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        const responseImage = yield call(axios.get, 'https://react-assignment-api.mallow-tech.com/api/validate-user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            yield put(createPostSuccess(responseImage.data))

        } else {

            yield put(createPostFailure(responseImage.data));
        }
    } catch (error) {
        yield put(createPostFailure('Post Created Failure'));
    }
}

function* createPostSaga() {
    yield takeEvery(createPost, createSaga);
}

export default createPostSaga;
