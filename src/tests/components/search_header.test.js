import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";
import SearchHeader from "../../components/search_header";

describe('Components | SearchHeader', () => {
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

    test('renders search_header', async () => {
        await act(async () => {
            render(<SearchHeader addComics={() => true} />, container);
        });

        expect(container.querySelectorAll("div[data-testid='search-header']").length).toEqual(1);
    });
});
