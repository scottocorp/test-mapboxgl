import React from 'react'
import { render } from 'react-dom'
import getRoot from 'get-root'
import './global.css'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import { IntlProvider } from 'react-intl'
import messages from './messages.json'

let store = applyMiddleware(thunk)(createStore)(reducer)

render(
  <IntlProvider messages={messages} locale="en">
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>,

  getRoot()
)
