import api from "../../services/api";
import MockAdapter from 'axios-mock-adapter';
import characterService from "../../services/character_service";

describe('Services | characterService', () => {
    const mock = new MockAdapter(api);
    const dataExample = {
        data: [
            { id: 1, name: 'Character 1' },
            { id: 2, name: 'Character 2' },
        ]
    };

    describe('list', () => {
        test('should list the characters', async () => {
            mock.onGet('characters').reply(200, dataExample);

            const [status, responseData, error] = await characterService.list();

            expect(status).toEqual(200);
            expect(responseData.data).toEqual(dataExample.data);
            expect(error).toBeNull();
        });

        test('should list the characters by name', async () => {
            mock.onGet('characters?name=deadpool').reply(200, dataExample);

            const [status, responseData, error] = await characterService.list('deadpool');

            expect(status).toEqual(200);
            expect(responseData.data).toEqual(dataExample.data);
            expect(error).toBeNull();
        });

        test('should receive an error', async () => {
            mock.onGet('characters').reply(500, {
                error: 'Error'
            });

            const [status, responseData, error] = await characterService.list();

            expect(status).toEqual(500);
            expect(responseData).toEqual({});
            expect(error).toEqual('Error');
        });
    });
});
