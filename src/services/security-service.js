
import config from '../config';




async function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'username': username, 'password': password },
    };

    const response = await fetch(`${config.apiUrl}/login`, requestOptions);
    const data = await handleResponse(response);
    if (data.token) {
        return data;
    }

}

function logout() {
    console.log("Logout");

}

function handleResponse(response) {
    return response.text().then(data => {

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();

            }

            const error = data || response.statusText;
            return Promise.reject(error);
        } else {
            return JSON.parse(data);
        }
    });


}

export default {
    login,
    logout,
};