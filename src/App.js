import "./homepage.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./components/About";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/bookingPage";
import ContactInfoPage from "./pages/contactInfoPage";
import ConfirmationPage from "./pages/confirmationPage";
import MyBookingsPage from "./pages/myBookingsPage";
import { useReducer } from "react";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <HomePage />
            </Main>
          }
        />
        <Route
          path="/booking"
          element={
            <Main>
              <BookingPage />
            </Main>
          }
        />
        <Route
          path="/booking/contact"
          element={
            <Main>
              <ContactInfoPage />
            </Main>
          }
        />
        <Route
          path="/booking/contact/confirmation"
          element={
            <Main>
              <ConfirmationPage />
            </Main>
          }
        />
        <Route
          path="/about"
          element={
            <Main>
              <About />
            </Main>
          }
        />
        <Route
          path="/myBookings"
          element={
            <Main>
              <MyBookingsPage />
            </Main>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
