import api from "./api";

const characterService = {
    async list(filterByName = null) {
        let responseData = {};
        let responseStatus = null;
        let responseError = null;
        let url = 'characters';

        if (filterByName !== null) {
            url += `?name=${filterByName}`
        }

        await api.get(url).then(response => {
            responseStatus = response.status;
            responseData = response.data;
        }).catch(error => {
            responseError = error.response.data.error || 'Service Unavailable';
            responseStatus = error.response.status || 503;
        });

        return [responseStatus, responseData, responseError];
    }
}

export default characterService;
