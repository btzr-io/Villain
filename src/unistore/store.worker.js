import createStore from 'stockroom'
import StoreWorker from './store.worker'

const store = createStore(new StoreWorker())

export default store
