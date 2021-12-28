import api from "./api";

const comicService = {
    async list(filterByCharactersIds = null) {
        let responseData = {};
        let responseStatus = null;
        let responseError = null;
        let url = 'comics';

        if (filterByCharactersIds !== null) {
            url += `?characters_ids=${filterByCharactersIds}`
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

export default comicService;
