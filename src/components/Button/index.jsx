import PropTypes from 'prop-types';
import styles from './button.module.scss';

export default function Button({onBtnClick}) {
    return (
        <button
            onClick={onBtnClick}
            className={styles.button}>Load more</button>
    );
};

Button.propTypes = {
    onBtnClick: PropTypes.func.isRequired,
};