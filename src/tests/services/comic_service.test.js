import api from "../../services/api";
import MockAdapter from 'axios-mock-adapter';
import comicService from "../../services/comic_service";

describe('Services | comicService', () => {
    const mock = new MockAdapter(api);
    const dataExample = {
        data: [
            { id: 1, title: 'Comic 1' },
            { id: 2, title: 'Comic 2' },
        ]
    };

    describe('list', () => {
        test('should list the comics', async () => {
            mock.onGet('comics').reply(200, dataExample);

            const [status, responseData, error] = await comicService.list();

            expect(status).toEqual(200);
            expect(responseData.data).toEqual(dataExample.data);
            expect(error).toBeNull();
        });

        test('should list the comics by characters_ids', async () => {
            mock.onGet('comics?characters_ids=123').reply(200, dataExample);

            const [status, responseData, error] = await comicService.list('123');

            expect(status).toEqual(200);
            expect(responseData.data).toEqual(dataExample.data);
            expect(error).toBeNull();
        });

        test('should receive an error', async () => {
            mock.onGet('comics').reply(500, {
                error: 'Error'
            });

            const [status, responseData, error] = await comicService.list();

            expect(status).toEqual(500);
            expect(responseData).toEqual({});
            expect(error).toEqual('Error');
        });
    });
});
