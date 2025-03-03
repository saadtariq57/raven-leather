import React from 'react';

const FullScreenLoading = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Gray background with opacity
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it's on top of everything
        pointerEvents: 'all', // Disable interactions with the rest of the page
      }}
    >
      <div className="loading-spinner">
        {/* Replace this with your loading spinner component or SVG */}
        <div
          style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid black',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
      </div>

      {/* Optional: Add CSS for the spinning animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default FullScreenLoading;