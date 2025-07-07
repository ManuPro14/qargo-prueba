'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    )

    if (!foundUser) {
      setError('Correo o contraseña incorrectos.')
      return
    }

    // Guardar la sesión actual
    localStorage.setItem('currentUser', JSON.stringify(foundUser))
    router.push('/notes')
  }

  return (
    <main className='flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4'>
      <div className='w-full max-w-md p-8 bg-white rounded-2xl shadow-xl'>
        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
          Bienvenido a <span className="text-blue-600">Qargo Notes</span>
        </h1>

        <form className='space-y-6 text-gray-700' onSubmit={handleLogin}>
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200'
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          ¿No tienes cuenta? <a href="/signup" className="text-blue-600 hover:underline">Regístrate</a>
        </p>
      </div>
    </main>
  )
}
