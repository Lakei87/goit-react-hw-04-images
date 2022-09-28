import { ThreeDots } from 'react-loader-spinner';
// import styles from './loader.module.scss';

const Loader = () => {
    return (
        <ThreeDots
            height = "80"
            width = "80"
            radius = "9"
            color = 'green'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle = {{margin: 'auto'}}
            // wrapperClass = {styles.loader}
        />  
    );
};

export default Loader;