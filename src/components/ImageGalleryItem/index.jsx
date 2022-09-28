import styles from './imageGalleryItem.module.scss';

const ImageGalleryItem = ({ imageData, onShowModal }) => {
    const { tags, webformatURL, largeImageURL } = imageData;

    return (
        <li
            className={styles.imageGalleryItem}
            onClick={() => { onShowModal(largeImageURL, tags); }}
        >
            <img
                className={styles.imageGalleryItem__image}
                src={webformatURL}
                alt={tags}
            />
        </li>
    )
};

export default ImageGalleryItem;
