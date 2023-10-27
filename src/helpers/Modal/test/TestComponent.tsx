import { useContext } from 'react';
import { ModalContext } from '../ModalContext';

export type TestProps = {
   id: number;
};
export const MODAL_ID = 'TEST';
export const props = { id: 20 };

export function ModalTest({ id }: TestProps) {
   return <div>Modal {id}</div>;
}

export function ContextTest() {
   const { show, hide } = useContext(ModalContext);

   return (
      <div>
         <p>testing</p>
         <button onClick={() => show<TestProps>(MODAL_ID, props)}>show</button>
         <button onClick={() => hide()}>hide</button>
      </div>
   );
}
