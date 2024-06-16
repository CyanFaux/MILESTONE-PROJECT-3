import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { CurrentUserProvider, CurrentUserContext } from './contexts/CurrentUser';
import MovieIndex from './movies/MovieIndex';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error404 from './Error404';
import Splash from './components/Splash';
// import { render } from '@testing-library/react';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Navigation />
      </CurrentUserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />}/>
          <Route path="/movies/:imdbId" element={<MovieIndex />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App