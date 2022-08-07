import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';
// import commonClasses from '../../Styles/CommonStyles.module.css';

// const getModalDisplay = (isActive) => isActive ? 'block' : 'none';

const Backdrop = (props) => {
  // const displayStyle = getModalDisplay(props.isActive);
  return <div style={{
  }} className={`${classes.backdrop}`} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div style={{ }} className={`${classes.modal}`}>
      <div className="container-fluid h-10">
        <div className="d-flex justify-content-between container-fluid w-100">
          <p className="text-primary">Add New General Entry</p>
          <div onClick={() => props.onClose()} className={`${classes['cancel-button']}  text-bold text-alert`}>
            X
          </div>
        </div>
      </div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop className={`${props.isModalActive ? 'd-block' : 'd-none'}`} onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay onClose={props.onClose} className={`${props.isModalActive ? 'd-block' : 'd-none'}`}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
