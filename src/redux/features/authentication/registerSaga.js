import { call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import Cookies from 'js-cookie';
import {registerUser, validUserFailure, validUserSuccess} from "./validateSlice";

function* registerUserSaga(action) {
    const { first_name, last_name, email, password, password_confirmation } = action.payload;

    try {
        const response = yield call(axios.post, "https://react-assignment-api.mallow-tech.com/api/register", {
            first_name,
            last_name,
            email,
            password,
            password_confirmation,
        });

        if (response.status === 200) {


            Cookies.set('token', response.headers.authorization.slice(7));
            yield put(validUserSuccess(response.data));
        }

    } catch (error) {
        const errorMessage = error.data && error.data.error ? error.data.error : 'User already Exists';
        yield put(validUserFailure(errorMessage));
    }
}

function* registerSaga(){
    yield takeEvery(registerUser,registerUserSaga)
}

export default registerSaga;