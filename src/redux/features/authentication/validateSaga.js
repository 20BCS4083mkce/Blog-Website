import {validUser,validUserSuccess,validUserFailure} from "./validateSlice";
import { call, put, takeLatest} from 'redux-saga/effects';
import Cookies from 'js-cookie';
import axios from 'axios';

function* validateUserSaga()
{
    const token=Cookies.get('token');
    console.log(token);
    try{
        const response = yield call(axios.get, 'https://react-assignment-api.mallow-tech.com/api/validate-user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if(response.status===200)
        {

            yield put(validUserSuccess(response.data))


        }
        else
        {

            yield put(validUserFailure())

        }
    }
    catch(error)
    {
        console.log(token);
        yield put(validUserFailure())
    }

}
function* validateSaga(){
    yield takeLatest(validUser,validateUserSaga)
}

export default validateSaga;