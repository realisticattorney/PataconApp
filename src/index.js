import React from 'react';
import ReactDOM from 'react-dom';
import Header from './subcomponents/Header';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Header /> {/* The various pages will be displayed by the `Main` component. */}
  </BrowserRouter>,
  document.getElementById("root")
);

