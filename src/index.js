import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';
import 'react-quill/dist/quill.snow.css'
import App from './App';
import {Provider, useDispatch} from 'react-redux'
import store from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


