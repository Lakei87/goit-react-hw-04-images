import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import styles from './imageGallery.module.scss';

export default function ImageGallery({ images, onShowModal }) {
    return (
        <ul className={styles.imageGallery}>
            {images.map(image => {
                return <ImageGalleryItem
                    key={image.id}
                    imageData={image}
                    onShowModal={onShowModal}
                />
            })}
        </ul>
    );
};

ImageGallery.propTypes = {
    onShowModal: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
};