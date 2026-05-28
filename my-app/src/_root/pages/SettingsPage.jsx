import React from 'react'

const SettingsPage = () => {
  return (
    <div className='mx-auto max-w-4xl px-5 py-6 md:px-8'>
       <header className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-stone-800">
          Configuración
        </h1>
      </header>

    <div>
      <ul className='space-y-5 w-full '>
        <li className='hover:bg-forest hover:text-white py-3 px-3 rounded-full cursor-pointer transition-all duration-300'>Cuenta</li>
        <li className='hover:bg-forest hover:text-white py-3 px-3 rounded-full cursor-pointer transition-all duration-300'>Repetir examen</li>
        <li className='hover:bg-forest hover:text-white py-3 px-3 rounded-full cursor-pointer transition-all duration-300'> Experiencia</li>
        <li className='hover:bg-forest hover:text-white py-3 px-3 rounded-full cursor-pointer transition-all duration-300'> Equipo de Cookingo</li>
      </ul>
    </div>

    </div>
  )
}

export default SettingsPage
