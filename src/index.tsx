import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import './styles.css';

import Game from "./Game";

import store from './store';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  rootElement
);
