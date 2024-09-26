import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Your main App component
import { AuthProvider } from './AuthContext'; // Path to your AuthContext file

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
