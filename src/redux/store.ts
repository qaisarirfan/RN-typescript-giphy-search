import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import { logger } from "redux-logger"

import rootReducers from "./reducers/search"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducers, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(rootSaga)

export default store
