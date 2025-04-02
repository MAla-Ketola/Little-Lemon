import './homepage.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from "./components/Main";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Main>
      <Footer />
    </>
  );
}

export default App;
