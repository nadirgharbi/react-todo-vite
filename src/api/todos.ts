import axios from "axios";

const baseUrl = "http://localhost:3333/api";

export const getTodos = async () => {
	try {
		const response = await axios.get(`${baseUrl}/todos`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const createTodo = async (data: Todos) => {
	try {
		const response = await axios.post(`${baseUrl}/todos`, data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const updateTodo = async (data: TodoUpdate, id: number) => {
	try {
		const response = await axios.put(`${baseUrl}/todos/${id}`, data);
		return response.data;
	} catch (error) {}
};

export const deleteTodos = async (id: number) => {
	try {
		const response = await axios.delete(`${baseUrl}/todos/${id}`);
		return response.data;
	} catch (error) {}
};
