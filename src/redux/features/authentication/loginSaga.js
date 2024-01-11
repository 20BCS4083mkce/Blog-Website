import { call, put, takeEvery} from 'redux-saga/effects';
import Cookies from 'js-cookie';
import axios from 'axios';
import {loginUser,validUserFailure, validUserSuccess} from "./validateSlice";

function* loginUserSaga(action){

    const { email, password} = action.payload;
    try {
        const response = yield call(axios.post, 'https://react-assignment-api.mallow-tech.com/api/login', {
            email,
            password,
        });
        if (response.status === 200) {

            Cookies.set('token', response.headers.authorization.slice(7));
            yield put(validUserSuccess(response.data))


        }

    }
    catch (error){

        const errorMessage = error.data && error.data.error ? error.data.error : 'Invalid Credentials';
        yield put(validUserFailure(errorMessage));
        console.log('sad');

    }

}
function* loginSaga(){
    yield takeEvery(loginUser,loginUserSaga)
}

export default loginSaga;