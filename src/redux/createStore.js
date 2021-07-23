import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
//import createSagaMiddle from 'redux-saga';

import rootReducer from './rootReducer';
//import rootSaga from './rootSaga.js'

//const sagaMiddleWare = createSagaMiddle(); 
export const middlewares = [thunk,/*sagaMiddleWare,*/logger];
export const store =  createStore(rootReducer, applyMiddleware(...middlewares));
    //sagaMiddleWare.run(rootSaga);
export default store; 

