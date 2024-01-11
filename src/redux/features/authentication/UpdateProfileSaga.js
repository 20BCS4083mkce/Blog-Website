import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { updateUser, updateUserFailure, updateUserSuccess,validUserSuccess } from "./validateSlice";
import Cookies from 'js-cookie';

function* updateUserSaga(action) {
    try {
        const { first_name, last_name, image } = action.payload;
        const token = yield call(Cookies.get, 'token');

        const formData = new FormData();
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('image', image.fileList[0].originFileObj);
        formData.append('_method', 'patch');
        console.log(image.fileList[0].originFileObj);
        const response = yield call(axios.post, 'https://react-assignment-api.mallow-tech.com/api/update/profile', formData, {
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
            yield put(validUserSuccess(responseImage.data))
            yield put(updateUserSuccess());

        } else {

            yield put(updateUserFailure());
        }
    } catch (error) {
        console.error('Failed to update profile with error:', error);
        yield put(updateUserFailure());
    }
}

function* updateSaga() {
    yield takeEvery(updateUser, updateUserSaga);
}

export default updateSaga;
