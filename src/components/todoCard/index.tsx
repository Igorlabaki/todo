import { todo } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FcCancel } from 'react-icons/fc';
import { MdFileDownloadDone, MdDelete,MdOutlineModeEdit } from 'react-icons/md';

interface Props{
    todoInfo : todo
    index    : number
}

export function TodoCardComponent({todoInfo, index}: Props) {
    
    const [updateMode, setupdateMode]   = useState(false)
    const [updateTodo, setupdateTodo]   = useState('')

    const handleDelete = async (id : number) => {
        await fetch('/api/todo' , {
        method: 'DELETE',
        body: JSON.stringify(id)
        })
    }

    const handleEdit = async (id : number, description : string) => {
        const data = {
        id,
        description
        }
        await fetch('/api/todo' , {
        method: 'PUT',
        body: JSON.stringify(data)  
        })
        setupdateMode(false)
    }

    return (
        <>
            <div className="flex justify-center">
                <div className=" relative justify-center mt-6">
                    <div className="absolute flex top-0 right-0 p-3 space-x-1">
                        {
                            updateMode ? 
                                <>
                                    <MdFileDownloadDone onClick={() => handleEdit(todoInfo.id,updateTodo)}  className='cursor-pointer' color='green' size={20}/>
                                    <FcCancel onClick={() => setupdateMode(false)} className='cursor-pointer' size={20}/>
                                </>
                            :
                                <>
                                    <MdOutlineModeEdit onClick={() => setupdateMode(true)} className='cursor-pointer hover:rounded-full'  size={20} color="rgb(117, 137, 235)"/>
                                    <MdDelete onClick={() => handleDelete(todoInfo.id)} className='cursor-pointer' size={20} color="rgb(235, 139, 117)"/>
                                </>
                        }
                    </div>
                <span className="absolute -left-3 -top-3 bg-green-500 flex justify-center items-center rounded-full w-8 h-8 text-gray-50 font-bold">{index + 1}</span>
                {
                    updateMode ? 
                    <textarea className="px-12 py-8 rounded-lg w-80" onChange={(e) => setupdateTodo(e.currentTarget.value)}>{todoInfo.description}</textarea>
                    :
                    <p className="bg-white px-12 py-8 rounded-lg w-80">{todoInfo.description}</p>
                }
                </div>
            </div>
        </>
    )
}
