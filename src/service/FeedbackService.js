import axios from "axios";
import {BASE_URL} from "../config/ApplicationConfig";
import {getUserById} from "./UserService";

export const getFeedbackListByClubId = async (id) => {
    return await axios.get(BASE_URL + "/api/feedbacks/" + id).then((response) => {
        return response.data
    });
};

export const createFeedback = async (text, rate, isComplaint, userId, clubId) => {
    return await axios.post(BASE_URL + "/api/feedback", {
            text: text,
            rate: rate,
            userId: userId,
            userName: "name",
            clubId: clubId
        }).then((response) => {
        return response.data
    });
};
