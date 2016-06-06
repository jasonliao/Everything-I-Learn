import 'zone.js';
import 'reflect-metadata';
import { bootstrap } from 'angular2/platform/browser';

import App from './components/app'

document.addEventListener('DOMContentLoaded', function () {
  bootstrap(App);
});
