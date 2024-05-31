import React, { ReactNode } from 'react'

interface FullScreenBackgroundProps {
  imageUrl: string
  children?: ReactNode // Esto permite pasar contenido interno
}

const FullScreenBackground: React.FC<FullScreenBackgroundProps> = ({
  imageUrl,
  children
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="screen-minus-navbar flex w-full items-center justify-center bg-cover bg-center bg-no-repeat"
    >
      {children}
    </div>
  )
}

export default FullScreenBackground
