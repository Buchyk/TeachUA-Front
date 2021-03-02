import axios from "axios";
import {BASE_URL} from "../config/ApplicationConfig";

export const getUserById = async (id) => {
    return await axios.get(BASE_URL + "/api/user/" + id).then((response) => {
        return response.data
    });
};


export const registerUser = async (data) => {
    return await axios.post(BASE_URL + "/api/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        roleName: data.role
    }).then((response) => {
        return response.data
    }).catch((error) => {
        return error.response.data
    });
};