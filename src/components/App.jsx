import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

import styles from './App.module.scss';

export class App extends Component {
  state = {
    page: 1,
    search: '',
  };

  handleInputChange = value => {
    this.setState({
      search: value,
      page: 1,
    });
  };

  handleLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    window.scrollMore({
      top: 100,
    });
  };

  render() {
    const { handleInputChange, handleLoadMoreBtn } = this;
    const { page, search } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={handleInputChange} />
        <ImageGallery
          searchQwery={search}
          page={page}
          onBtnClick={handleLoadMoreBtn}
        />
      </div>
    );
  };
};
