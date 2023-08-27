import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Components/Main/Main';
import './styles/index.scss';
import Rain from './Components/Rain/Rain';
import Umbrella from './Components/Umbrella/Umbrella';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Umbrella />
    <Rain />
    <Main />
  </React.StrictMode>
);


