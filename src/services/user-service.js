
import config from '../config';
import securityService from './security-service';



async function getAll(token) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': token }
    };

    const response = await fetch(`${config.apiUrl}/users`, requestOptions);
    const data = await handleResponse(response);
    if(data.users){
        return data.users;
    }

    return 'No users found';
    
}

function update(user) {

}

async function register(user) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
            name: user.name,
            email: user.email,
            password: user.password
        }
    };

    const response = await fetch(`${config.apiUrl}/users`, requestOptions);
    const data = await handleResponse(response);
   
    return data;
    
}

function deleteUser(id) {

}

function handleResponse(response) {
    return response.text().then(data => {

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                securityService.logout();

            }

            const error = data || response.statusText;
            return Promise.reject(error);
        } else {
            return JSON.parse(data);
        }
    });
}


export default {
    getAll,
    update,
    register,
    delete: deleteUser
};