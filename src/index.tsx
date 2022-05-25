import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginContainer from "./containers/LoginContainer";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./modules";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import MainContainer from "./containers/MainContainer";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createStore(rootReducer, applyMiddleware(thunk));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/login" element={<LoginContainer />} />
            </Routes>
        </BrowserRouter>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
