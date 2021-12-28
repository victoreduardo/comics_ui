import React from 'react';

const ComicList = (props) => {
    const { comics, updateFavoriteComic } = props;

    const setFavorite = (comic) => {
        updateFavoriteComic(comic.id);
    }

    return (
        <div className="row">
            {comics.map(comic => {
                return(
                    <div key={comic.id} className="col col-md-2 padding-10" data-testid='comic-card'>
                        <div className={comic.favorite ? 'comic-card comic-card-active' : 'comic-card'}
                             onClick={() => setFavorite(comic)}
                        >
                            <img src={comic.url} className="comic-image" data-testid='comic-image' />
                            <div className="comic-favorite-img" data-testid='comic-favorite-img' />
                            <div className="comic-title text-center" data-testid='comic-title'>
                                {comic.title}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ComicList;
