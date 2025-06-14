// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState('welcome');
  const [candlesLit, setCandlesLit] = useState(Array(5).fill(true));
  const [cakePieces, setCakePieces] = useState(Array(8).fill(false));
  const [allCandlesBlown, setAllCandlesBlown] = useState(false);

  useEffect(() => {
    if (candlesLit.every(lit => !lit) && !allCandlesBlown) {
      setAllCandlesBlown(true);
      setTimeout(() => setStep('cutting'), 2000);
    }
  }, [candlesLit, allCandlesBlown]);

  const blowCandle = (index) => {
    if (candlesLit[index]) {
      const newCandles = [...candlesLit];
      newCandles[index] = false;
      setCandlesLit(newCandles);
    }
  };

  const cutPiece = (index) => {
    if (step !== 'cutting') return;
    
    const newPieces = [...cakePieces];
    newPieces[index] = true;
    setCakePieces(newPieces);
    
    if (newPieces.every(piece => piece)) {
      setTimeout(() => setStep('completed'), 1000);
    }
  };

  return (
    <div className={`app ${step}`}>
      {step === 'welcome' && (
        <div className="welcome-screen">
          <h1 className="bounce-in">Happy Birthday Jay Sir!</h1>
          <p className="fade-in">Wishing you a day filled with joy and happiness!</p>
          <button 
            className="continue-btn pulse" 
            onClick={() => setStep('cake')}
          >
            Click Here to Continue
          </button>
        </div>
      )}

      {step === 'cake' && (
        <div className="cake-container">
          <div className="cake">
            {/* Cake layers */}
            <div className="layer layer-bottom"></div>
            <div className="layer layer-middle"></div>
            <div className="layer layer-top"></div>
            
            {/* Icing */}
            <div className="icing icing-top"></div>
            <div className="icing icing-middle"></div>
            <div className="icing icing-bottom"></div>
            
            {/* Candles */}
            <div className="candles">
              {candlesLit.map((lit, index) => (
                <div 
                  key={index} 
                  className="candle" 
                  style={{ left: `${20 + index * 15}%` }}
                  onMouseEnter={() => blowCandle(index)}
                >
                  <div className="candle-stick"></div>
                  <div className={`flame ${lit ? 'burning' : ''}`}></div>
                  {lit && <div className="glow"></div>}
                </div>
              ))}
            </div>
          </div>
          
          {allCandlesBlown && (
            <div className="congratulations animate-pop">
              <h2>Congratulations Jay Sir!</h2>
              <p>Now let's cut the cake!</p>
            </div>
          )}
        </div>
      )}

      {step === 'cutting' && (
        <div className="cutting-phase">
          <h2 className="slide-in">Time to cut the cake!</h2>
          <p className="fade-in">Hover over the cake to cut into pieces</p>
          
          <div className="cake-circle">
            {Array.from({ length: 8 }).map((_, index) => (
              <div 
                key={index}
                className={`cake-piece ${cakePieces[index] ? 'cut' : ''}`}
                style={{ 
                  transform: `rotate(${index * 45}deg)`,
                  opacity: cakePieces[index] ? 0 : 1
                }}
                onMouseEnter={() => cutPiece(index)}
              >
                <div className="piece-inner"></div>
              </div>
            ))}
            
            <div className="cake-center"></div>
          </div>
        </div>
      )}

      {step === 'completed' && (
        <div className="completed-screen">
          <h1 className="celebrate">🎉 Congratulations! 🎉</h1>
          <p className="message">The cake has been successfully cut!</p>
          <p className="wishes">Wishing you a wonderful year ahead, Jay Sir!</p>
          <button 
            className="restart-btn" 
            onClick={() => {
              setStep('welcome');
              setCandlesLit(Array(5).fill(true));
              setCakePieces(Array(8).fill(false));
              setAllCandlesBlown(false);
            }}
          >
            Start Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;