import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ imgDesc, largeImg, onShowModal }) {
    useEffect(() => {
        const onEscapeKeydown = e => {
            if (e.code === 'Escape') {
                onShowModal();
            };
        };
        window.addEventListener('keydown', onEscapeKeydown);
        
        return () => {
            window.removeEventListener('keydown', onEscapeKeydown);
        };
    }, [onShowModal]);
    
    
    const onClickOverlay = e => {
        if (e.currentTarget === e.target) {
            onShowModal();
        };
    };

    return createPortal(
        <div className={styles.overlay} onClick={onClickOverlay}>
            <div className={styles.modal}>
                <img src={largeImg} alt={imgDesc} />
            </div>
        </div>, modalRoot
    );
};

Modal.propTypes = {
    onShowModal: PropTypes.func.isRequired,
    largeImg: PropTypes.string.isRequired,
    imgDesc: PropTypes.string.isRequired,
};