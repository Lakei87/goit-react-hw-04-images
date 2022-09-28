import styles from './button.module.scss';

const Button = ({onBtnClick}) => {
    return (
        <button
        onClick={onBtnClick}
        className={styles.button}>Load more</button>
    );
}

export default Button;