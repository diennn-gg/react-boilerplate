import React from 'react';
import './App.css';
import RenderRouter from './routers/RenderRouter'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/state/store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="app">
          <RenderRouter />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
