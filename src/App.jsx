import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState('welcome');
  const [candlesLit, setCandlesLit] = useState(Array(5).fill(true));
  const [cakePieces, setCakePieces] = useState(Array(8).fill(false));
  const [allCandlesBlown, setAllCandlesBlown] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [platePieces, setPlatePieces] = useState([]);

  useEffect(() => {
    if (candlesLit.every(lit => !lit) && !allCandlesBlown) {
      setAllCandlesBlown(true);
      setShowSparkles(true);
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
    if (!newPieces[index]) {
      newPieces[index] = true;
      setCakePieces(newPieces);
      
      // Add piece to plate with animation delay
      setTimeout(() => {
        setPlatePieces(prev => [...prev, index]);
      }, 500);
      
      if (newPieces.every(piece => piece)) {
        setTimeout(() => setStep('completed'), 1000);
      }
    }
  };

  return (
    <div className={`app ${step}`}>
      {showSparkles && step !== 'welcome' && (
        <div className="sparkles">
          {Array(50).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              }}
            ></div>
          ))}
        </div>
      )}

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
            <div className="layer layer-bottom"></div>
            <div className="layer layer-middle"></div>
            <div className="layer layer-top"></div>
            
            <div className="icing icing-top"></div>
            <div className="icing icing-middle"></div>
            <div className="icing icing-bottom"></div>
            
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
                  {!lit && <div className="smoke"></div>}
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
          <p className="fade-in">Congratulations from settlo Tech Team 😇😇</p>
          
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
          
          <div className="plate">
            <div className="plate-design"></div>
            {platePieces.map((pieceIndex, i) => (
              <div 
                key={i}
                className="plate-piece"
                style={{
                  transform: `rotate(${pieceIndex * 45}deg)`,
                  animationDelay: `${i * 0.1}s`
                }}
              >
                <div className="piece-inner"></div>
              </div>
            ))}
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
              setShowSparkles(false);
              setPlatePieces([]);
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