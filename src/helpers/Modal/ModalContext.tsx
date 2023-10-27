import React, { PropsWithChildren, createContext, useState } from 'react';

export interface ModalElement {
   [key: string]: React.ElementType;
}
interface ModalProperties {
   id: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   props?: any;
}

interface ModalContextState {
   show: <T = unknown>(id: string, props?: T) => void;
   hide: () => void;
   register: (id: string, element: React.ElementType) => void;
}

const initialState: ModalContextState = {
   show: () => {},
   hide: () => {},
   register: () => {}
};

interface ModalProviderProps {
   modals: ModalElement;
}

export const ModalContext = createContext<ModalContextState>(initialState);

export function ModalProvider({ children, modals }: PropsWithChildren<ModalProviderProps>) {
   const [store, setStore] = useState<ModalElement>(modals);
   const [modal, setModal] = useState<ModalProperties | null>(null);

   function show<T = unknown>(id: string, props?: T) {
      if (!store[id]) return;

      setModal({ id, props });
   }

   const register = (id: string, element: React.ElementType) => {
      if (store[id]) return;

      setStore({ ...store, [id]: element });
   };

   const hide = () => {
      setModal(null);
   };

   const render = () => {
      if (modal === null) return null;

      const { id, props } = modal;

      const SelectedModal = store[id];

      return <SelectedModal {...props} />;
   };

   return (
      <ModalContext.Provider value={{ register, show, hide }}>
         {render()}
         {children}
      </ModalContext.Provider>
   );
}
