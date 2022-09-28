import { Component } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import ImageGalleryItem from 'components/ImageGalleryItem';
import imagesApi from 'services/imagesApi';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import styles from './imageGallery.module.scss';

class ImageGallery extends Component {
    state = {
        images: [],
        status: 'idle',
        totalPages: 1,
        largeImg: '',
        imgDesc: '',
        showModal: false,
    };

    componentDidUpdate = async (prevProps, _) => {
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
                    Notify.failure(`We can not find ${searchQwery}. Try another request`);
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

    handleGalleryItemClick = (largeImg, imgDesc) => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
            largeImg,
            imgDesc,
        }));
    };

    render() {
        const { images, status, totalPages, showModal, largeImg, imgDesc } = this.state;
        const { onBtnClick, page } = this.props;

        return (
            <>
                {images.length > 0 && (
                    <ul className={styles.imageGallery}>
                        {images.map(image => {
                            const { id } = image;
                            return <ImageGalleryItem
                                key={id}
                                imageData={image}
                                onShowModal={this.handleGalleryItemClick}
                            />
                        })}
                    </ul>
                )}

                {status === 'pending' && <Loader />}

                {status === 'resolved' && page !== totalPages && (
                    <Button onBtnClick={onBtnClick} />
                )}

                {status === 'error' && (
                    <p>Ups, something went wrong. Please try again later</p>
                )}

                {showModal && (
                    <Modal
                        onShowModal={this.handleGalleryItemClick}
                        largeImg={largeImg}
                        imgDesc={imgDesc}
                    />
                )}

            </>
        );
    };
};

ImageGallery.propTypes = {
    onBtnClick: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    searchQwery: PropTypes.string.isRequired,
}

export default ImageGallery;