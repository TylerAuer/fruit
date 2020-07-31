import React from 'react';
import Directions from './components/Directions';
import Matrix from './components/Matrix';
import BottomInfo from './components/BottomInfo';

const App = () => {
  return (
    <>
      <Directions />
      <main className="app" style={{ minHeight: '100vh' }}>
        <Matrix />
      </main>
      <BottomInfo />
    </>
  );
};

export default App;
