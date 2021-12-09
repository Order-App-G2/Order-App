import { Fragment} from 'react';
import classes from './Modal.module.css';
import ReactDom from 'react-dom';

const Backdrop = (props: any) => {
    return(
        <div className={classes.backdrop} onClick={props.onClose}/>
    );
}

const ModalOverlay = (props: any) => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

const portalElement = document.getElementById('overlays');
 
const Modal = (props: any) => {
    return (
        <Fragment>
            {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElement as Element)}
            {ReactDom.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>, 
                portalElement as Element
            )}
        </Fragment>
    );
};

export default Modal;