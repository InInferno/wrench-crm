import React from 'react';
import { Route, Routes } from 'react-router';
import 'assets/styles/index.scss';
import MainPage from 'pages/MainPage/MainPage';
import Navbar from 'components/Navbar/Navbar';
import AddressesPage from 'pages/AddressesPage/AddressesPage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/addresses" element={<AddressesPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
