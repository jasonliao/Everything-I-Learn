import React from 'react';

import Appbar from '../components/Appbar';
import Appmain from '../components/Appmain';
import Appfooter from '../components/Appfooter';

import 'stylesheets/App.scss';

const App = () => (
  <div id="App">
    <Appbar />
    <Appmain />
    <Appfooter />
  </div>
);

export default App;
