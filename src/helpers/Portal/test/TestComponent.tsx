import { useContext } from 'react';
import { PortalContext } from '../PortalContext';

export type TestProps = {
   id: number;
};
export const MODAL_ID = 'TEST';
export const props = { id: 20 };

export function ModalTest({ id }: TestProps) {
   return <div>Modal {id}</div>;
}

export function ContextTest() {
   const { showModal, hideModal } = useContext(PortalContext);

   return (
      <div>
         <p>testing</p>
         <button onClick={() => showModal<TestProps>(MODAL_ID, props)}>show</button>
         <button onClick={() => hideModal()}>hide</button>
      </div>
   );
}
