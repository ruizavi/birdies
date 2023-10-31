import React from 'react';
import ModalHeader from './ModalHeader';
import ModalBase, { ModalProps } from './ModalBase';

interface ModalComponent
   extends React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>> {
   Header: typeof ModalHeader;
}

const Modal = {
   ...ModalBase,
   Header: ModalHeader
} as ModalComponent;

export default Modal;
