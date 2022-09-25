import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import imagesApi from 'services/imagesApi';
import styles from './imageGallery.module.scss';

class ImageGallery extends Component {
    state = {
        page: 1,
        search: '',
        images: [],
        status: 'idle',
    }

    componentDidUpdate = async (prevProps, PrevState) => {
        const { searchQwery, page } = this.props;

        if (prevProps.searchQwery !== searchQwery) {
            try {
                this.setState({ status: 'pending', });
                const response = await imagesApi(page, searchQwery);
                this.setState(prevState => ({
                    images: [...prevState.images, ...response.hits],
                    status: 'resolved',
                }));
            } catch (error) {
                
            }
        }
    }

    render() {
        const { images } = this.state;
        return (
            <>
                {images.length > 0 && (
                    <ul className={styles.imageGallery}>
                        {images.map(image => {
                            const { id, webformatURL } = image;
                            return <ImageGalleryItem
                                key={id}
                                webformatURL={webformatURL}
                            />
                        })}
                    </ul>
                )}
            </>
        )
    };
};

export default ImageGallery;