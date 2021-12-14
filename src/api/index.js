import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/dev'
});

export const getApiWithUser = (endpoint, header) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            ...header
        }
    };
    console.log(header)
    return api.get(endpoint, config)
        .then(response => response.data);
}

export const uploadWithS3 = (url, file) => {
    return axios.put(url, file, {
        headers: {
          'Content-Type': file.type
        }
      }).then(e => e)
      .catch( e=> e)
}
