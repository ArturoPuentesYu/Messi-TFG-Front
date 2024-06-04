// Terms.tsx
import React from 'react'

const Terms: React.FC = () => {
  return (
    <div className="screen-minus-navbar flex items-center justify-center bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
      <div className="flex w-[80%] flex-col sm:w-[30rem]">
        <h1 className="mb-4 text-3xl font-bold">Términos y Condiciones</h1>
        <p className="mb-4">
          Bienvenido a nuestro sitio web. Si continúa navegando y utilizando este
          sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y
          condiciones de uso, que junto con nuestra política de privacidad rigen la
          relación de nuestra empresa con usted en relación con este sitio web.
        </p>
      </div>
    </div>
  )
}

export default Terms
