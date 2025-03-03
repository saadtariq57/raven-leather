import React from 'react';

export default function ButtonLoadingSpinner({ color }: { color?: string }) {
  return (
    <div className="flex justify-center items-center">
      <div className={`w-4 h-4 border-2 border-t-transparent ${ color === "black" ? "border-black" : "border-white"} rounded-full animate-spin`}></div>
    </div> 


  );
};

