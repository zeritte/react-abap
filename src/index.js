import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { history, store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import App from './containers/app'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import 'sanitize.css/sanitize.css'
import './index.css'
import CorporateABold from './fonts/CorporateALight.ttf'

const corporateBold = {
  fontFamily: 'CorporateD',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('CorporateABold'),
    local('CorporateABold'),
    url(${CorporateABold}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#a6d4fa' },
    secondary: { main: '#f48fb1' },
    error: { main: '#d32f2f' }
  },
  typography: {
    fontFamily: 'CorporateD, Arial'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [corporateBold]
      }
    }
  }
})

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light'
  },
  typography: {
    fontFamily: 'CorporateD, Arial'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [corporateBold]
      }
    }
  }
})

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  target
)
