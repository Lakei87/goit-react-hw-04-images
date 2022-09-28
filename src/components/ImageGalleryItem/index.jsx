import PropTypes from 'prop-types';
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
    );
};

ImageGalleryItem.propTypes = {
    imageData: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    },).isRequired,
    onShowModal:PropTypes.func.isRequired,
}

export default ImageGalleryItem;
