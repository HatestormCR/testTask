import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { storeConfig } from "./store/storeConfig";
import Home from "./pages/Home";

const store = storeConfig();

ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
