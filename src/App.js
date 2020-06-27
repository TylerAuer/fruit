import React, { useState } from 'react';

const App = () => {
  // null while not on the plane
  const [apple, setApple] = useState(null);

  return (
    <div className="App">
      <header className="header">
        <h2 className="header__title">Fruit</h2>
        <div className="header__subtitle">
          An aggregator of people's feelings about fruit. Inspired by XKCD
        </div>
      </header>
      <main className="app">
        <div className="app__unranked-fruit-holder"></div>
        <div className="app__plane">
          <div className="app__axis">DRAG ME!</div>
        </div>
        <button className="app__submit">Submit</button>
      </main>
      <footer className="footer">
        <div className="footer__help-btn">Help</div>
        <div className="footer__tyler-btn">Tyler Auer</div>
        <div className="footer__inspiration-btn">Inspiration</div>
      </footer>
    </div>
  );
};

export default App;
