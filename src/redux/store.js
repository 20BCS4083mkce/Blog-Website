import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import loginSaga from './features/authentication/loginSaga'
import validateReduce from './features/authentication/validateSlice'
import validateSaga from './features/authentication/validateSaga'
import registerSaga from "./features/authentication/registerSaga";
import logoutSaga from "./features/authentication/logoutSaga";
import updateSaga from "./features/authentication/UpdateProfileSaga";
import postReducer from "./features/Post/postSlice";
import postSaga from "./features/Post/postSaga";
import publicpostReducer  from "./features/PublicPost/publicpostSlice";
import publicpostSaga from "./features/PublicPost/publicpostSaga";
import publicpostContentSaga from "./features/PublicPost/publicpostContentSaga";
import publicpostContentupdateSaga from "./features/PublicPost/publicpostContentupdateSaga";
import createPostSaga from "./features/Post/createPostSaga";
import previewPostSaga from "./features/Post/previewPostSaga";
import postDeleteSaga from "./features/Post/postDeleteSaga";
import updatePostSaga from "./features/Post/updatePostSaga";
import publishSaga from "./features/Post/publishSaga";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {

        validate: validateReduce,
        post:postReducer,
        publicpost:publicpostReducer,
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(registerSaga)
sagaMiddleware.run(loginSaga);
sagaMiddleware.run(logoutSaga);
sagaMiddleware.run(validateSaga)
sagaMiddleware.run(updateSaga);
sagaMiddleware.run(postSaga);
sagaMiddleware.run(publicpostSaga);
sagaMiddleware.run(publicpostContentSaga);
sagaMiddleware.run(publicpostContentupdateSaga);
sagaMiddleware.run(createPostSaga);
sagaMiddleware.run(previewPostSaga);
sagaMiddleware.run(postDeleteSaga);
sagaMiddleware.run(updatePostSaga);
sagaMiddleware.run(publishSaga);
export default store;