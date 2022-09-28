import { Component } from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import styles from './searchbar.module.scss';

class Searchbar extends Component {
    state = {
        search: '',
    };

    handleInputChange = e => {
        const { value } = e.currentTarget;
        this.setState({
            search: value,
        });
    };

    onSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state.search);
        scroll.scrollToTop();
    };

    render() {
        const { handleInputChange, onSubmit } = this;
        return (
            <header className={styles.searchbar}>
                <form className={styles.searchForm} onSubmit={onSubmit}>
                    <button
                        type="submit"
                        className={styles.searchForm__button}>
                        <span className={styles.searchForm__buttonLabel}>Search</span>
                    </button>

                    <input
                        className={styles.searchForm__input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleInputChange}
                    
                    />
                </form>
            </header>
        );
    };
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;