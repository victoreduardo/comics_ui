import React, { Component } from 'react';
import './App.css';
import SearchHeader from "./components/search_header";
import ComicList from "./components/comic_list";
import favoriteComicService from "./services/favorite_comic_service"

class App extends Component {
    constructor() {
        super();
        this.state = {
            comics: []
        }

        this.addComics = (comics) => {
            this.setState({ comics });
        }

        this.updateFavoriteComic = async (comicId) => {
            const comics = this.state.comics.slice();
            let favorite = false;

            comics.forEach(comic => {
                if (comic.id === comicId) {
                    comic.favorite = !comic.favorite;
                    favorite = comic.favorite;

                    return;
                }
            });

            if (favorite) {
                await favoriteComicService.create(comicId);
            } else {
                await favoriteComicService.delete(comicId);
            }

            this.addComics(comics);
        }
    }

    render(){
        return (
            <div>
                <SearchHeader addComics={this.addComics.bind(this)} />
                <div className="App container container-fluid">
                    <ComicList comics={this.state.comics} updateFavoriteComic={this.updateFavoriteComic.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default App;
