import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const baseUrl = "https://apiv1.nadir-gharbi.fr/api";

export const getTodos = async () => {
	try {
		const token = Cookies.get("user_token");
		const response = await axios.get(`${baseUrl}/todos`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
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
		toast.error("Une erreur est survenue");
		console.error(error);
	}
};

export const updateTodo = async (data: TodoUpdate, id: number) => {
	try {
		const response = await axios.put(`${baseUrl}/todos/${id}`, data);
		return response.data;
	} catch (error) {}
};

export const deleteOneTodo = async (id: number) => {
	try {
		const response = axios.delete(`${baseUrl}/todos/${id}`);
		console.log(response);
	} catch (error) {
		console.error("Erreur lors de la suppression des tâches :", error);
		throw error;
	}
};

export const deleteTodos = async (ids: number[]) => {
	try {
		const deleteRequests = ids.map((id) => axios.delete(`${baseUrl}/todos/${id}`));
		await Promise.all(deleteRequests);
		return true; // ou vous pouvez retourner un message de succès si nécessaire
	} catch (error) {
		console.error("Erreur lors de la suppression des tâches :", error);
		throw error;
	}
};
