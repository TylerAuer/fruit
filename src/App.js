import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h2 className="header__title">Fruit</h2>
        <div className="header__subtitle">
          An aggregator of people's feelings about fruit inspired by XKCD
        </div>
      </header>
      <main>
        <div className="app__unranked-fruit-holder"></div>
        <div className="app__plane"></div>
        <div className="app__submit"></div>
      </main>
      <footer className="footer">
        <div className="footer__help-btn">Help</div>
        <div className="footer__tyler-btn">Tyler Auer</div>
        <div className="footer__inspiration-btn">Inspiration</div>
      </footer>
    </div>
  );
}

export default App;
