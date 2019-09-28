import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.less'
import '../assets/styles/index.less'
import { history } from './utils/history'

import { Router } from './containers/Router.container'
import { configureStore } from './config/configureStore'

const rootElement = document.getElementById('root')

ReactDOM.render(
	<Provider store={configureStore()}>
		<Router history={history} />
	</Provider>,
	rootElement
)
