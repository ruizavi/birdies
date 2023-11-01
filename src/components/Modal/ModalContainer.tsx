import React, { useContext, useEffect } from 'react';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';
import ModalContext from './ModalContext';

export interface ModalContainerProps extends AsProps<'div'>, React.HTMLAttributes<HTMLElement> {}

const ModalContainer = React.forwardRef<HTMLDivElement, ModalContainerProps>((props, ref) => {
   const { as, children, role, className, prefix = 'modal-container', ...rest } = props;

   const { addClassPrefix, merge } = useClass(prefix);

   const classes = merge(className, addClassPrefix());

   const modalContext = useContext(ModalContext);

   const Component = as || 'div';

   useEffect(() => {
      document.addEventListener('keydown', e => {
         if (e.key === 'Escape' && modalContext?.onModalClose !== undefined) {
            modalContext?.onModalClose();
         }
      });

      return () => {
         document.removeEventListener('keydown', e => {
            if (e.key === 'Escape' && modalContext?.onModalClose !== undefined) {
               modalContext?.onModalClose();
            }
         });
      };
   }, []);

   return (
      <Component {...rest} ref={ref} role={role} className={classes}>
         {children}
      </Component>
   );
});

ModalContainer.displayName = 'Modal-Container';

export default ModalContainer;
