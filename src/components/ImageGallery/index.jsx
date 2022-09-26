import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import imagesApi from 'services/imagesApi';
import Button from 'components/Button';
import styles from './imageGallery.module.scss';

class ImageGallery extends Component {
    state = {
        images: [],
        status: 'idle',
        totalPages: 1,
    }

    componentDidUpdate = async (prevProps, PrevState) => {
        const { searchQwery, page } = this.props;

        if (prevProps.searchQwery !== searchQwery ||
            prevProps.page !== page) 
            try {
                this.setState({ status: 'pending', });
                const response = await imagesApi(page, searchQwery);
                if (response.totalHits === 0) {
                    this.setState({
                        images: [],
                        status: 'idle',
                    });
                    alert('Not found');
                    return;
                };

                this.setState({
                    totalPages: Math.ceil(response.totalHits / 12),
                });

                if (prevProps.searchQwery === searchQwery &&
                    prevProps.page > page) {
                    this.setState({
                        images: [...response.hits],
                        status: 'resolved',
                    });
                };
                if (prevProps.searchQwery !== searchQwery) {
                    this.setState({
                        images: [...response.hits],
                        status: 'resolved',
                    });
                };
                if (prevProps.page < page) {
                    this.setState({ status: 'pending', });
                    const response = await imagesApi(page, searchQwery);
                    this.setState(prevState => ({
                        images: [...prevState.images, ...response.hits],
                        status: 'resolved',
                    }));
                };
            } catch (error) {
                this.setState({ status: 'error', });
            };
    };

    render() {
        const { images, status, totalPages } = this.state;
        const { onBtnClick, page } = this.props;

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

                {status === 'resolved' && page !== totalPages && (
                    <Button onBtnClick={onBtnClick} />
                )}

                {status === 'error' && (
                    <p>Ups, something was wrong!!!</p>
                )}
            </>
        )
    };
};

export default ImageGallery;