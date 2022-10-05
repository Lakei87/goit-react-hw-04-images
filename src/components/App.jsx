import { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll'
import { Notify } from 'notiflix';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import imagesApiService from 'services/imagesApi';
import styles from './App.module.scss';

export default function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalPages, setTotalPages] = useState(1);
  const [largeImg, setLargeImg] = useState('');
  const [imgDesc, setImgDesc] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    async function fetchImages() {
      try {
        setStatus('pending');
        const response = await imagesApiService(page, searchQuery);
        
        if (response.totalHits === 0) {
          setImages([]);
          setStatus('idle');
          Notify.failure(`We can not find ${searchQuery}. Try another request.`);
          return;
        };

        setTotalPages(Math.ceil(response.totalHits / 12));
        if (page === 1) {
          setImages([...response.hits]);
          setStatus('resolved');
          return;
        };

        setImages(prevImages => [...prevImages, ...response.hits]);
        setStatus('resolved');

      } catch (error) {
        setStatus('error');
      };
    };

    fetchImages();
  }, [page, searchQuery]);
  
  const handleGalleryItemClick = (largeImg, imgDesc) => {
    setShowModal(prev => !prev);
    setLargeImg(largeImg);
    setImgDesc(imgDesc);
  };

  const handleInputChange = value => {
    setSearchQuery(value);
    setPage(1);
  };
  
  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
    scrollMore();
  };

  const scrollMore = () => {
    const screenHeight = window.screen.height;
    scroll.scrollMore(screenHeight / 1.5);
  };


  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleInputChange} />

      {images.length > 0 && (
        <ImageGallery
          images={images}
          onShowModal={handleGalleryItemClick}
        />
      )}

      {status === 'pending' && <Loader />}

      {status === 'resolved' && page !== totalPages && (
          <Button onBtnClick={handleLoadMoreBtn} />
      )}

      {status === 'error' && (
          <p>Ups, something went wrong. Please try again later</p>
      )}

      {showModal && (
          <Modal
              onShowModal={handleGalleryItemClick}
              largeImg={largeImg}
              imgDesc={imgDesc}
          />
      )}
    </div>
  );
};