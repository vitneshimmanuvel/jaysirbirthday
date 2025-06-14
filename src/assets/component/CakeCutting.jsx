import React, { useState, useRef } from 'react';


const CakeCutting = () => {
  const [isCutting, setIsCutting] = useState(false);
  const [cuts, setCuts] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [pieceInfo, setPieceInfo] = useState(null);
  const cakeRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cakeRef.current) return;
    
    // Get cake container dimensions
    const rect = cakeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Position knife cursor relative to mouse
    const knife = document.getElementById('knife-cursor');
    if (knife) {
      knife.style.left = `${x + 15}px`;
      knife.style.top = `${y - 15}px`;
    }
  };

  const handleCut = (e) => {
    if (!cakeRef.current) return;
    
    const rect = cakeRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Create new cut line
    setCuts([...cuts, { id: Date.now(), x, y }]);
    
    // Show cutting animation
    setIsCutting(true);
    setTimeout(() => setIsCutting(false), 500);
  };

  const handlePieceHover = (pieceId) => {
    setShowInfo(true);
    // Sample cake piece information
    setPieceInfo({
      id: pieceId,
      flavor: "Vanilla Bean",
      calories: "285 kcal",
      ingredients: "Flour, Sugar, Eggs, Vanilla",
      message: "Happy Anniversary!"
    });
  };

  return (
    <div className="cake-container">
      <h1>Digital Cake Cutting Experience</h1>
      
      <div 
        className="cake-area" 
        ref={cakeRef}
        onMouseMove={handleMouseMove}
        onClick={handleCut}
      >
        {/* Cake Image */}
        <div className="cake-image" />
        
        {/* Knife Cursor */}
        <div id="knife-cursor" className="knife">🔪</div>
        
        {/* Cutting Animation */}
        {isCutting && <div className="cut-animation"></div>}
        
        {/* Cut Lines */}
        {cuts.map(cut => (
          <div 
            key={cut.id}
            className="cut-line"
            style={{
              left: `${cut.x}%`,
              top: `${cut.y}%`
            }}
          />
        ))}
        
        {/* Cake Pieces */}
        <div className="cake-pieces">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="cake-piece"
              onMouseEnter={() => handlePieceHover(i+1)}
              onMouseLeave={() => setShowInfo(false)}
            />
          ))}
        </div>
      </div>
      
      {/* Information Panel */}
      <div className={`info-panel ${showInfo ? 'visible' : ''}`}>
        {pieceInfo && (
          <>
            <h2>Piece #{pieceInfo.id}</h2>
            <p><strong>Flavor:</strong> {pieceInfo.flavor}</p>
            <p><strong>Calories:</strong> {pieceInfo.calories}</p>
            <p><strong>Ingredients:</strong> {pieceInfo.ingredients}</p>
            <p><strong>Message:</strong> {pieceInfo.message}</p>
          </>
        )}
      </div>
      
      <div className="instructions">
        <p>🔪 Hover over the cake to use the knife</p>
        <p>🎂 Click to cut the cake</p>
        <p>ℹ️ Hover over pieces for details</p>
      </div>
    </div>
  );
};

export default CakeCutting;