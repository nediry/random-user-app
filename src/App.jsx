import React from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Users from './components/Users';

const App = () => {
  return (
    <>
      <Header title="Random User App" />
      <Navbar />
      <div className="container">
        <Users />
      </div>
    </>
  )
}

export default App;