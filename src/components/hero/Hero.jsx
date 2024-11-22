import React, { useState } from 'react'
import axios from '../../api'
import { useFetch } from '../../hooks/useFetch'
import './Hero.scss'

const Hero = () => {
  const { data, loading, error } = useFetch('students');
  const [formData, setFormData] = useState({ name: '', score: '', grade: '' });
  const [editId, setEditId] = useState(null)

  
  const handleCreate = (e) => {
      e.preventDefault()
      axios.post('/students', formData).then(() => {
          setFormData({ name: '', score: '', grade: '' })
          window.location.reload()
        })
    }
    
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.put(`/students/${editId}`, formData).then(() => {
      setFormData({ name: '', score: '', grade: '' })
      setEditId(null)
      window.location.reload()
    })
  }

  const handleDelete = (id) => {
    axios.delete(`/students/${id}`).then(() => {
      window.location.reload()
    })
  }

  const startEdit = (student) => {
    setEditId(student.id)
    setFormData({ name: student.name, score: student.score, grade: student.grade })
  }

  return (
    <div className="main">
      <div className="container">
        <h1>Studentlar Boshqaruvi</h1>
        <form onSubmit={editId ? handleUpdate : handleCreate} className="student-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="score"
            placeholder="Score"
            value={formData.score}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={formData.grade}
            onChange={handleChange}
            required
          />
          <button type="submit">{editId ? 'Update' : 'Create'}</button>
        </form>

        <div className="wrapper">
          {loading && <p>Loading...</p>}
          {error && <p>Error loading students: {error.message}</p>}
          {data?.length === 0 && <p>Stundentlar topilmadi...</p>}
          {data?.map((item) => (
            <div key={item.id} className="students">
              <h2>Isim: {item.name}</h2>
              <h2>Ball: {item.score}</h2>
              <h2>Sinif: {item.grade}</h2>
              <button onClick={() => startEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
