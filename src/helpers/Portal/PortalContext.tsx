import React, { PropsWithChildren, createContext, useState } from 'react';

export interface ModalElement {
   [key: string]: React.ElementType;
}
interface PortalProperties {
   id: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   props?: any;
}

export interface PortalContextState {
   showModal: <T = unknown>(id: string, props?: T) => void;
   hideModal: () => void;
}

const initialState: PortalContextState = {
   showModal: () => {},
   hideModal: () => {}
};

interface PortalProviderProps {
   modals: ModalElement;
}

export const PortalContext = createContext<PortalContextState>(initialState);

// TODO: Add toast
export function PortalProvider({ children, modals }: PropsWithChildren<PortalProviderProps>) {
   const [modalStored] = useState<ModalElement>(modals);
   const [modal, setModal] = useState<PortalProperties | null>(null);

   function showModal<T = unknown>(id: string, props?: T) {
      if (!modalStored[id]) return;

      setModal({ id, props });
   }

   const hideModal = () => {
      setModal(null);
   };

   const renderModal = () => {
      if (modal === null) return null;

      const { id, props } = modal;

      const Component = modalStored[id];

      return <Component {...props} />;
   };

   return (
      <PortalContext.Provider value={{ showModal, hideModal }}>
         {renderModal()}
         {children}
      </PortalContext.Provider>
   );
}
