import  prisma  from "./prisma"

export interface Todo{
    id:             number
    description:    string
}

export async function allTodos() {
    const data = await prisma.todo.findMany();
    return data
}

export async function deleteTodo(id: string) {
    await prisma.todo.delete({
        where: {
            id: id
        }
    });
}
export async function createTodo(description: string) {
    await prisma.todo.create({
        data:{
            description
        }
    });
}

export async function editTodo(id: string, description: string) {
    try {
        const todoUpdate = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                description: description
            }
        })
    } catch (error) {
        console.log(error)
    }
}  