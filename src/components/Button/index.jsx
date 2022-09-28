import PropTypes from 'prop-types';
import styles from './button.module.scss';

const Button = ({ onBtnClick }) => {
    return (
        <button
            onClick={onBtnClick}
            className={styles.button}>Load more</button>
    );
};

Button.propTypes = {
    onBtnClick: PropTypes.func.isRequired,
}

export default Button;