import React from 'react';
import Header from './components/Header';
import Matrix from './components/Matrix';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className="app">
        <Matrix />
      </main>
      <Footer />
    </>
  );
};

export default App;
