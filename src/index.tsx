import React from 'react'
import ReactDOM from 'react-dom'
import { BaseCSS } from 'styled-bootstrap-grid'
import { App } from './App'
import { Provider as MobxProvider } from 'mobx-react'
import * as stores from '@/stores'

ReactDOM.render(
  <>
    <MobxProvider {...stores}>
      <BaseCSS />
      <App />
    </MobxProvider>
  </>,
  document.getElementById('root'),
)
