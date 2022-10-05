import { useState } from 'react'
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import styles from './searchbar.module.scss';


export default function Searchbar({ onSubmit }) {
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleInputChange = e => {
        const { value } = e.currentTarget;
        setSearchQuery(value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(searchQuery);
        scroll.scrollToTop();
    };

    return (
        <header className={styles.searchbar}>
            <form className={styles.searchForm} onSubmit={handleSubmit}>
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

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};