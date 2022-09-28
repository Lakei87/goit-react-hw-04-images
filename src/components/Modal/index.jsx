import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
    componentDidMount = () => {
        window.addEventListener('keydown', this.onEscapeKeydown);
    };

    componentWillUnmount = () => {
        window.removeEventListener('keydown', this.onEscapeKeydown);
    };

    onEscapeKeydown = e => {
        if (e.code === 'Escape') {
            this.props.onShowModal();
        };
    };

    onClickOverlay = e => {
        console.log(e.currentTarget)
        console.log(e.target)
        if (e.currentTarget === e.target) {
            this.props.onShowModal();
        };
    };

    render() {
        const { imgDesc, largeImg } = this.props;

        return createPortal(
            <div className={styles.overlay} onClick={this.onClickOverlay}>
                <div className={styles.modal}>
                    <img src={largeImg} alt={imgDesc} />
                </div>
            </div>, modalRoot
        );
    };
};

Modal.propTypes = {
    onShowModal: PropTypes.func.isRequired,
    largeImg: PropTypes.string.isRequired,
    imgDesc: PropTypes.string.isRequired,
}

export default Modal;