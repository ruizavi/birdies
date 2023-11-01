import React, { createContext } from 'react';

export interface ModalContextProps {
   onModalClose?: (e?: React.MouseEvent) => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export default ModalContext;
