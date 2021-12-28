import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import ComicList from "../../components/comic_list";

describe('Components | ComicList', () => {
    let container = null;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    test('renders comic list', async () => {
        const comics = [
            { id: 1, title: "Comic 1", thumbnail_url: 'url1', favorite: false },
            { id: 2, title: "Comic 2", thumbnail_url: 'url2', favorite: true }
        ];
        const updateFavoriteComic = (comicId) => {

        }

        await act(async () => {
            render(<ComicList comics={comics} updateFavoriteComic={updateFavoriteComic.bind(this)} />, container);
        });

        const comicCards = container.querySelectorAll("div[data-testid='comic-card']");
        expect(comicCards.length).toEqual(2);
        // comicCards.forEach(comicCard => {
        //     const comic = comics.find(comic => comic.id === comicCard.key);
        //     expect(comicCard.querySelector("div[data-testid='comic-image']").src).toBe(comic.thumbnail_url);
        //     expect(comicCard.querySelector("div[data-testid='comic-title']").textContent).toBe(comic.title);
        //     expect(comicCard.querySelector("div[data-testid='comic-image']").background).toBe('New Metric');
        // })
    });
});
