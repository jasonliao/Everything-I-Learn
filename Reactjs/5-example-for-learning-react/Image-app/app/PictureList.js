import React from 'react';
import Picture from './Picture';

export default class PictureList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      pictures: [],
      favorites: []
    }
  }
  componentDidMount () {
    var url = 'https://api.instagram.com/v1/media/popular?client_id=' + this.props.apikey + '&callback=?';
    $.getJSON(url, (result) => {
      if (!result || !result.data || !result.data.length) {
        return;
      }
      
      var pictures = result.data.map((p) => {
        return {
          id: p.id,
          url: p.link,
          src: p.images.low_resolution.url,
          title: p.caption ? p.caption.text : '',
          favorite: false
        };
      });

      this.setState({
        pictures: pictures
      });
    });
  }
  pictureClick (id) {
    var favorites = this.state.favorites,
        pictures = this.state.pictures;

    for (var i = 0; i < pictures.length; i++) {
      if (pictures[i].id == id) {
        if (pictures[i].favorite) {
          return this.favoriteClick.bind(this)(id);
        }

        favorites.push(pictures[i]);
        pictures[i].favorite = true;

        break;
      }
    }

    this.setState({
      pictures: pictures,
      favorites: favorites
    });
  }
  favoriteClick (id) {
    var favorites = this.state.favorites,
        pictures = this.state.pictures;

    for(var i = 0; i < favorites.length; i++){
      if(favorites[i].id == id) break;
    }

    favorites.splice(i, 1);

    for (i = 0; i < pictures.length; i++) {
      if (pictures[i].id == id) {
        pictures[i].favorite = false;
        break;
      }
    }

    this.setState({
      pictures: pictures,
      favorites: favorites
    });
  }
  render () {
    var pictures = this.state.pictures.map((p) => {
      return <Picture id={p.id} src={p.src} title={p.title} favorite={p.favorite} onClick={this.pictureClick.bind(this)} />
    });

    if (!pictures.length) {
      pictures = <p>Loading image...</p>;
    }

    var favorites = this.state.favorites.map((p) => {
      return <Picture id={p.id} src={p.src} title={p.title} favorite={true} onClick={this.favoriteClick.bind(this)} />
    });

    if (!favorites.length) {
      favorites = <p>Click an image to mark it as a favorite.</p>;
    }

    return (
      <div>
        <h1>Popular Instagram pics</h1>
        <div className="pictures"> {pictures} </div>
        <h1>Your favorites</h1>
        <div className="favorites"> {favorites} </div>
      </div>
    );
  }
}
