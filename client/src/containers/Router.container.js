import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from './App.container'
import Second from './Second.container'

export class Router extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" exact component={App} />
                <Route path="/second" exact component={Second} />
            </BrowserRouter>
        )
    }
}
