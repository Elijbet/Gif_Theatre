import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppAlternative from './App-alternative';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppAlternative />, document.getElementById('root'));
registerServiceWorker();
