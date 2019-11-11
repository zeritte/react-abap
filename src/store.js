import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createWhitelistFilter } from 'redux-persist-transform-filter'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import thunk from 'redux-thunk'
import * as History from 'history'
import rootReducer from './modules'

export const history = History.createBrowserHistory()

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [
    createWhitelistFilter('main', ['isLoggedIn', 'userId', 'token', 'role'])
  ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  connectRouter(history)(persistedReducer),
  initialState,
  composedEnhancers
)

const persistor = persistStore(store)

export { store, persistor }
