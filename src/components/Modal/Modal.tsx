import React from 'react';
import ModalHeader from './ModalHeader';
import ModalBase, { ModalProps } from './ModalBase';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

import './Modal.less';

export interface ModalComponent
   extends React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>> {
   Header: typeof ModalHeader;
   Title: typeof ModalTitle;
   Body: typeof ModalBody;
   Footer: typeof ModalFooter;
}

const Modal = {
   ...ModalBase,
   Header: ModalHeader,
   Title: ModalTitle,
   Body: ModalBody,
   Footer: ModalFooter
} as ModalComponent;

export default Modal;
