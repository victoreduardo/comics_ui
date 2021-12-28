import React, {useState} from 'react';
import AsyncSelect from 'react-select/async';
import characterService from "../services/character_service";
import comicService from "../services/comic_service";

const SearchHeader = (props) => {
    const { addComics } = props;
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (selectedOp) => {
        setSelectedOption(selectedOp);
        loadComics(selectedOp.value);
    }

    const filterCharacters = async (inputValue) => {
        const results = [];
        const [responseStatus, responseData, responseError] = await characterService.list(inputValue);

        if (responseStatus === 200) {
            responseData.data.forEach(character => {
                results.push({value: character.id, label: character.name});
            })
        }

        return results;
    };

    let waitingFilter = null;
    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            if (waitingFilter !== null) clearTimeout(waitingFilter);

            waitingFilter = setTimeout(() => {
                resolve(filterCharacters(inputValue));
            }, 2000);
        });

    const loadComics = async (charactersIds) => {
        const [responseStatus, responseData, responseError] = await comicService.list(charactersIds);

        if (responseStatus === 200) {
            const comics = responseData.data.map(comic => {
                return {id: comic.id, title: comic.title, url: comic.thumbnail_url, favorite: comic.favorite}
            })
            addComics(comics);
        }
    }

    return (
        <header className="navbar navbar-dark flex-column flex-md-row bd-navbar bg-red">
            <div className="App container padding-10" data-testid="search-header">
                <div  className="col col-md-12 text-center">
                    <img src="/assets/marvel_logo.png" className="margin-10" width="130" height="52" />
                </div>
                <div className="row justify-content-center width-100">
                    <div className="col-6">
                        <AsyncSelect cacheOptions loadOptions={promiseOptions} value={selectedOption} onChange={handleChange} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default SearchHeader;
