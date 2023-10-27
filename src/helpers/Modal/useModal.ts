import { useContext } from 'react';
import { ModalContext } from './ModalContext';

export default function useModal() {
   return useContext(ModalContext);
}
