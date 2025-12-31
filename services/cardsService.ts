import axios from "axios";

const api = "https://bcard-ojqa.onrender.com/cards";

function getConfig() {
    return {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    };
}

export function getCards() {
    return axios.get(api);
}

export function getCard(id: string) {
    return axios.get(`${api}/${id}`);
}

export function getMyCards() {
    return axios.get(`${api}/my-cards`, getConfig());
}

export function createCard(card: any) {
    return axios.post(api, card, getConfig());
}

export function editCard(id: string, card: any) {
    return axios.put(`${api}/${id}`, card, getConfig());
}

export function setLike(id: string) {
    return axios.patch(`${api}/${id}`, {}, getConfig());
}

export function deleteCard(id: string) {
    return axios.delete(`${api}/${id}`, getConfig());
}