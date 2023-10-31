import React, { useContext } from 'react';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';
import ModalContext from './ModalContext';

export interface ModalHeaderProps extends AsProps<'header'>, React.HTMLAttributes<HTMLElement> {
   classPrefix?: string;
}

const ModalHeader = React.forwardRef<HTMLHeadElement, ModalHeaderProps>((props, ref) => {
   const {
      role = 'heading',
      classPrefix = 'modal-header',
      as = 'header',
      className,
      children,
      ...rest
   } = props;

   const { addClassPrefix, merge } = useClass(classPrefix);

   const classes = merge(className, addClassPrefix());

   const Component = as || 'header';

   const modalContext = useContext(ModalContext);

   return (
      <Component {...rest} role={role} className={classes} ref={ref}>
         {children}
         <button onClick={modalContext?.onModalClose}>x</button>
      </Component>
   );
});

ModalHeader.displayName = 'Modal-Header';

export default ModalHeader;
