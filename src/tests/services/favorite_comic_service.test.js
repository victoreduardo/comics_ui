import api from "../../services/api";
import MockAdapter from 'axios-mock-adapter';
import favoriteComicService from "../../services/favorite_comic_service";

describe('Services | favoriteComicService', () => {
    const mock = new MockAdapter(api);
    const requiredData = {
        data: { id: 1, comic_external_id: 123 }
    };

    describe('create', () => {
        test('should create a favoriteComic', async () => {
            mock.onPost('favorite_comics', {favorite_comic: { comic_external_id: 123}})
                .reply(200, requiredData);

            const [status, responseData, error] = await favoriteComicService.create(123);

            expect(status).toEqual(200);
            expect(responseData.data).toEqual(requiredData.data);
            expect(error).toBeNull();
        });

        test('should receive an error', async () => {
            mock.onPost('favorite_comics', {favorite_comic: { comic_external_id: 123}})
                .reply(500, { error: 'Error' });

            const [status, responseData, error] = await favoriteComicService.create(123);

            expect(status).toEqual(500);
            expect(responseData).toEqual({});
            expect(error).toEqual('Error');
        });
    });

    describe('delete', () => {
        test('should delete a favoriteComic', async () => {
            mock.onDelete('favorite_comics/123').reply(200, {});

            const [status, responseData, error] = await favoriteComicService.delete(123);

            expect(status).toEqual(200);
            expect(responseData).toEqual({});
            expect(error).toBeNull();
        });

        test('should receive an error', async () => {
            mock.onDelete('favorite_comics/123').reply(500, { error: 'Error' });

            const [status, responseData, error] = await favoriteComicService.delete(123);

            expect(status).toEqual(500);
            expect(responseData).toEqual({});
            expect(error).toEqual('Error');
        });
    });
});
