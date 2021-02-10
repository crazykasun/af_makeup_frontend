import {API} from "../config";

export const createAdmin = user => {
    console.log(user);
    return fetch(`${API}/admin/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
};

export const createPackage = (userId, token, product) => {
    return fetch(`${API}/package/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization : `Bearer ${token}`
        },
        body: product
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};
