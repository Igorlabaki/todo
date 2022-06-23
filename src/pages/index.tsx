import { prisma, todo } from '@prisma/client'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { allTodos } from '../../lib/db'


import { TodoCardComponent } from '../components/todoCard'


interface PostProps{
  todos: any[]
}

export default function Home({}: PostProps ) {

  const [todos, setTodos]             = useState<todo[]>([])
  const [description, setdescription] = useState('')
  
  const handleRegister = async (description : string) => {
    await fetch('/api/todo' , {
      method: 'POST',
      body: JSON.stringify(description)
    })
  }

  const getallTodos = async () => {
    const response = await fetch('/api/todo' , {
    method: 'GET',
    })
    const data = await response.json()
    setTodos(data)
  } 

  useEffect(() => {
      getallTodos()
  }, [todos])

  return (
    <div className="h-screen bg-blue-900">
      <nav className="flex justify-center p-4 bg-blue-800">
        <h1 className="text-white text-2xl font-bold">Todo List</h1>
      </nav>
    <div>
      <form className="flex justify-center mt-10">
        <div className="bg-gray-50 p-8 rounded-lg">
          <h1 className="text-center mb-4">Write Todo List</h1>
          <div className="flex justify-between p-2 w-full bg-white rounded-md">
            <input value={description} onChange={(e) => setdescription(e.currentTarget.value)} type="text" placeholder="Write here..." className="w-full outline-none" />
            <button className="bg-green-500 px-2 py-1 rounded-md text-white font-semibold" onClick={() => handleRegister(description)}>Send</button>
          </div>
        </div>
      </form>
      { todos.map( (todo,index) => {
        return(
          <TodoCardComponent key={todo.id} todoInfo={todo}  index={index}/>
        )
      })}
    </div>
  </div>
  )
}

export const getServerSideProps : GetServerSideProps = async () => {

  const todos = await allTodos(); 

  return{

    props: {
      todos
    }
  }
}
