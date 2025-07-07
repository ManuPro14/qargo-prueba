'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { SquarePen, Trash2, LogOut } from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
  userEmail: string
}

export default function Notes() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<{ email: string; nombre: string } | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (!storedUser) return router.push('/login')
    const parsedUser = JSON.parse(storedUser)
    setCurrentUser(parsedUser)

    const allNotes = JSON.parse(localStorage.getItem('notes') || '[]')
    const userNotes = allNotes.filter((n: Note) => n.userEmail === parsedUser.email)
    setNotes(userNotes)
  }, [])

  //guardar notas en localStorage
  const saveNotes = (updatedNotes: Note[]) => {
    const allNotes = JSON.parse(localStorage.getItem('notes') || '[]')
    const others = allNotes.filter((n: Note) => n.userEmail !== currentUser?.email)
    const finalNotes = [...others, ...updatedNotes]
    localStorage.setItem('notes', JSON.stringify(finalNotes))
    setNotes(updatedNotes)
  }

  //manejo del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) return

    if (editingId) {
      const updated = notes.map((note) =>
        note.id === editingId ? { ...note, title, content } : note
      )
      saveNotes(updated)
      setEditingId(null)
    } else {
      const newNote: Note = {
        id: uuidv4(),
        title,
        content,
        userEmail: currentUser!.email,
      }
      const updated = [...notes, newNote]
      saveNotes(updated)
    }

    setTitle('')
    setContent('')
  }

  //edición de notas
  const handleEdit = (note: Note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note.id)
  }

  //eliminar notas
  const handleDelete = (id: string) => {
    const updated = notes.filter((n) => n.id !== id)
    saveNotes(updated)
  }

  //cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-gray-200 via-white to-gray-200 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón de logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Notas de {currentUser?.nombre}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-800 hover:bg-red-600 hover:text-white p-1 rounded-full transition text-sm"
          >
            <LogOut size={24} />
            
          </button>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4 text-gray-800 max-w-screen-lg mx-auto"
        >
          <input
            type="text"
            placeholder="Título de la nota"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            placeholder="Contenido..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editingId ? 'Actualizar Nota' : 'Agregar Nota'}
          </button>
        </form>

        {/* Lista de notas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-row justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
                <p className="text-gray-600 mt-2 whitespace-pre-wrap">{note.content}</p>
              </div>
              <div className="mt-4 flex gap-2 flex-col">
                <button
                  onClick={() => handleEdit(note)}
                  className="p-1 text-sm text-gray-800 rounded-full hover:bg-yellow-500 hover:text-white transition"
                >
                  <SquarePen className="inline-block" />
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="p-1 text-sm text-red-500 rounded-full hover:bg-red-600 hover:text-white transition"
                >
                  <Trash2 className="inline-block" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
