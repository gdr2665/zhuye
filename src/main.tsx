import { createRoot } from 'react-dom/client'
import App from '@/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from '@/tools/data'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from '@@/Loading'
import React from 'react'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
