import './index.css';

import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import { MainActions } from './Store/Action/MainActions';
import { mainStore } from './Store/MainStore';

MainActions.init();

ReactDOM.render(
  <Provider mainStore={mainStore}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
