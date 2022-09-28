import { Component } from 'react';
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
    }

    componentDidUpdate = async (prevProps, prevState) => {
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

    handleGalleryItemClick = (largeImg, imgDesc) => {
        console.log(largeImg)
        this.setState(({ showModal }) => ({
            showModal: !showModal,
            largeImg,
            imgDesc,
        }))
        console.log(this.state.largeImg)
    }

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
                    <p>Ups, something was wrong!!!</p>
                )}

                {showModal && (
                    <Modal
                        onShowModal={this.handleGalleryItemClick}
                        largeImg={largeImg}
                        imgDesc={imgDesc}
                    />
                )}

            </>
        )
    };
};

export default ImageGallery;