import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import styles from './App.module.scss';

export class App extends Component {
  state = {
    page: 1,
    search: '',
  };

  onInputChange = value => {
    this.setState({
      search: value,
      page: 1,
    });
  };

  render() {
    const { onInputChange } = this;
    const { page, search } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={onInputChange} />
        <ImageGallery
          searchQwery={search}
          page={page}
        />
      </div>
    );
  };
};
