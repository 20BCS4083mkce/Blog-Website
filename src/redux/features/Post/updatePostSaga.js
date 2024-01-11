import { call, put, takeEvery,select } from 'redux-saga/effects';
import axios from 'axios';
import Cookies from 'js-cookie';
import {updatePost, updatePostFailure, updatePostSuccess} from "./postSlice";

function* updateSaga(action) {
    try {
        const { name, content, image } = action.payload;
        const token = yield call(Cookies.get, 'token');
        const id=yield select((state) => state.post.preview.id);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('content', content);
        formData.append('image', image.fileList[0].originFileObj);
        formData.append('_method', 'patch');
        console.log(image.fileList[0].originFileObj);
        const response = yield call(axios.post, `https://react-assignment-api.mallow-tech.com/api/posts/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        if (response.status === 200) {
            yield put(updatePostSuccess());

        } else {

            yield put(updatePostFailure());
        }
    } catch (error) {
        yield put(updatePostFailure());
    }
}

function* updatePostSaga() {
    yield takeEvery(updatePost, updateSaga);
}

export default updatePostSaga;
