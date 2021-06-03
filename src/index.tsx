import React from 'react'
import ReactDOM from 'react-dom'
import { BaseCSS } from 'styled-bootstrap-grid'
import { App } from './App'
import { Provider as MobxProvider } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import * as stores from '@/stores'

ReactDOM.render(
  <>
    <MobxProvider {...stores}>
      <Router>
        <BaseCSS />
        <App />
      </Router>
    </MobxProvider>
  </>,
  document.getElementById('root'),
)
