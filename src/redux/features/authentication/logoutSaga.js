import { call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';
import {logoutUser, validUserFailure, validUserSuccess} from "./validateSlice";
import Cookies from 'js-cookie';
function* logoutUserSaga()
{
    try{
        const token = yield call(Cookies.get, 'token'); // Retrieve token from cookies or your preferred storage method
        const response = yield call(axios.delete, 'https://react-assignment-api.mallow-tech.com/api/logout', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.status===200)
        {
            yield put(validUserFailure());
        }
    }
    catch(error)
    {
        yield put(validUserSuccess());
    }
}
function* logoutSaga()
{
    yield takeEvery(logoutUser,logoutUserSaga)
}

export default logoutSaga;