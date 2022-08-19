import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import App from './app/App'
import {store} from './app/store'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

const rerenderEntireTree = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>, document.getElementById('root'))
}

rerenderEntireTree()


// If you want your appActions to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()


if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/App', () => {
        rerenderEntireTree();
    })
}
