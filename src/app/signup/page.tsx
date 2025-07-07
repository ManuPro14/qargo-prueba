'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const userExists = users.find((u: any) => u.email === email)
    if (userExists) {
      setError('Este correo ya está registrado.')
      return
    }

    const newUser = { nombre, email, password }
    const updatedUsers = [...users, newUser]
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    router.push('/notes')
  }

  return (
    <main className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 via-white to-gray-200 px-4'>
      <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-xl'>
        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
          Crea tu cuenta en <span className="text-blue-600">Qargo Notes</span>
        </h1>

        <form className='space-y-6 text-gray-700' onSubmit={handleSignup}>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombre"
              autoComplete="name"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="nombre@correo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Crea una contraseña"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200'
          >
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 hover:underline">Inicia sesión</a>
        </p>
      </div>
    </main>
  )
}
