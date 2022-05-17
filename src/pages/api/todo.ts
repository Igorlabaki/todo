import { NextApiRequest, NextApiResponse } from "next";
import { allTodos, createTodo, deleteTodo, editTodo } from "../../../lib/db";

export default async function handler( req: NextApiRequest, resp: NextApiResponse){
  if(req.method == 'GET'){
    const todos = await allTodos()
    return resp.status(200).json(todos)
  }
  if(req.method == 'POST'){
    const data = JSON.parse(req.body)
    await createTodo(data)
    return resp.status(200).json({ message: 'Sucess'})
  }
  if(req.method == 'PUT'){
    const data = JSON.parse(req.body)
    await editTodo(data.id, data.description)
    return resp.status(200).json({ message: 'Sucess'})
  }
  if(req.method == 'DELETE'){
    const data = JSON.parse(req.body)
    await deleteTodo(data)
    return resp.status(200).json({ message: 'Sucess'})
  }
  resp.status(200)
}