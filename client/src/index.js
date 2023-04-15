import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';


const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App callback={() => console.log("renderered")} />       
        </BrowserRouter>
    </React.StrictMode>
);

