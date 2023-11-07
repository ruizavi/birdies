import { useContext } from 'react';
import { PortalContext } from './PortalContext';

export default function usePortal() {
   return useContext(PortalContext);
}
