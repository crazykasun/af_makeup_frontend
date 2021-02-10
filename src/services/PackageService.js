import {API} from "../config";

export const getImage = (packageId) => {
    return fetch(`${API}/package/image/${packageId}`, {
        method: "GET",
    })
        .then(response => response)
        .catch(err => console.log(err))
};

export const getPackages = (sortBy) => {
    return fetch(`${API}/packages`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const getPackage = (productId) => {
    return fetch(`${API}/package/${productId}`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const updateBookedAmount = (packId, quantity) => {
    return fetch(`${API}/package/${packId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({quantity: quantity})
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};
