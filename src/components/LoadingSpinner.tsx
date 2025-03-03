import React from 'react';

const LoadingSpinner = ({
  size = "8",
  color = "border-gray-500"
}: {
  size?: string;
  color?: string;
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-solid ${color} border-t-transparent h-${size} w-${size}`}
    />
  );
};

export default LoadingSpinner;