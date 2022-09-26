import styles from './imageGalleryItem.module.scss';

const ImageGalleryItem = ({webformatURL}) => {
    return (
        <li className={styles.imageGalleryItem}>
            <img
                className={styles.imageGalleryItem__image}
                src={webformatURL}
                alt=""
            />
        </li>
    )
};

export default ImageGalleryItem;
