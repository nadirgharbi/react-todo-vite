import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const baseUrl = "http://localhost:3333/api/auth";

export const userLogin = async (data: UserLogin) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, data);
    toast.success(response.data);
    Cookies.set("user_token", response.data.token.token);
    window.location.href = "/";
  } catch (error) {
    toast.error("Vos identifiants sont incorrect. Veuillez reessayez");
    console.log(error);
  }
};

export const userRegister = async (data: UserRegister) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, data);
    Cookies.set("user_token", response.data.token.token);
    window.location.href = "/";
  } catch (error: any) {
    toast.error("Une erreur est survenue lors de l'inscription");
    console.log(error);
  }
};

export const userLogout = async (data: any) => {
  try {
    const token = Cookies.get("user_token");
    await axios.post(`${baseUrl}/logout`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Cookies.remove("user_token");
    window.location.href = "/login";
  } catch (error) {
    toast.error("Oops, une erreur s'est produite. Veuillez reessayez");
    console.log(error);
  }
};

export const getUserData = async () => {
  try {
    const token = Cookies.get("user_token");
    const response = await axios.get(`${baseUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`, // ajout du token dans le header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
    throw error;
  }
};
