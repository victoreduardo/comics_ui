import api from "./api";

const serviceName = 'favorite_comics';

const favoriteComicService = {
    async create(comic_external_id) {
        let responseData = {};
        let responseStatus = null;
        let responseError = null;

        await api.post(serviceName, { favorite_comic: { comic_external_id: comic_external_id } })
        .then(response => {
            responseStatus = response.status;
            responseData = response.data;
        }).catch(error => {
            responseError = error.response.data.error || 'Service Unavailable';
            responseStatus = error.response.status || 503;
        });

        return [responseStatus, responseData, responseError];
    },
    async delete(id) {
        let responseData = {};
        let responseStatus = null;
        let responseError = null;

        await api.delete(`${serviceName}/${id}`)
            .then(response => {
                responseStatus = response.status;
                responseData = response.data;
            }).catch(error => {
                responseError = error.response.data.error || 'Service Unavailable';
                responseStatus = error.response.status || 503;
            });

        return [responseStatus, responseData, responseError];
    }
}

export default favoriteComicService;
