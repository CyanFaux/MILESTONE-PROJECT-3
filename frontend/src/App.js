import React, {useState, useEffect, Suspense} from 'react';
import './App.css';
import SearchBar from './components/searchBar';
import { createResource } from './Request';
import Display from './components/Display';
import Loading from './Loading';
import Navigation from './components/Navigation';
import { CurrentUserContext } from './contexts/CurrentUser';
// import { render } from '@testing-library/react';

function App() {
  return (
    <div className="App">
      <CurrentUserContext>
      <Navigation />
      </CurrentUserContext>
    </div>
  );
}

export default App