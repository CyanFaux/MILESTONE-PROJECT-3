import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import SignUpForm from "./users/SignUpForm";
import LoginForm from "./users/LoginForm";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrentUserProvider from "./contexts/CurrentUser.js";
import Error404 from "./Error404";
import MovieIndex from "./movies/MovieIndex";
import MovieDetails from "./movies/MovieDetails.js";
/* import Home from "./Home"; */
// import { render } from '@testing-library/react';

function App() {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Router>
          <Navigation />
          <Routes>
            {/*             <Route exact path="/" component={Home} /> */}
            <Route exact path="/sign-up" component={SignUpForm} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/movies" component={MovieIndex} />
            <Route exact path="/movies/new" component={MovieDetails} />
            <Route exact path="/movies/:imdbId" component={MovieIndex} />
            <Route path="/" element={Error404} />
          </Routes>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
