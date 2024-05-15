import React, { ReactNode } from 'react';

interface FullScreenBackgroundProps {
  imageUrl: string;
  children?: ReactNode;  // Esto permite pasar contenido interno
}

const FullScreenBackground: React.FC<FullScreenBackgroundProps> = ({ imageUrl, children }) => {
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="w-full screen-minus-navbar bg-cover bg-center bg-no-repeat flex justify-center items-center"
    >
      {children}
    </div>
  );
};

export default FullScreenBackground;
