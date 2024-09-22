import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

export const getAllTodos = async ()=>{
    return await commonAPI("GET",`${BASE_URL}/todos`,"")
}

export const uploadTodos = async (reqBody)=>{
    return await commonAPI("POST",`${BASE_URL}/todos`,reqBody)
}

export const deleteATodo = async (id)=>{
    return await commonAPI("DELETE",`${BASE_URL}/todos/${id}`,{})
}

export const updateTodo = async (id, updatedTask) => {
    try {
        return await commonAPI("PUT",`${BASE_URL}/todos/${id}`, { task: updatedTask });
    } catch (error) {
        console.error('Error updating the todo:', error);
        throw error;
    }
};

// export const updateTodo = async (id, newTodo) => {
//     try {
//         const response = await fetch(`${BASE_URL}/todos/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ Todos: newTodo }),
//         });
//         if (!response.ok) {
//             const error = await response.text(); // Get error details
//             throw new Error(`Network response was not ok: ${error}`);
//         }
//         return response.json();
//     } catch (error) {
//         console.error('Error updating Todo:', error);
//         throw error;
//     }
// };