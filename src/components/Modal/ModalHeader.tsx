import React from 'react';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';

export interface ModalHeaderProps extends AsProps<'header'>, React.HTMLAttributes<HTMLElement> {
   classPrefix?: string;
   handleClose?: () => void;
}

const ModalHeader = React.forwardRef<HTMLHeadElement, ModalHeaderProps>((props, ref) => {
   const {
      role = 'heading',
      classPrefix = 'modal-header',
      as = 'header',
      className,
      children,
      handleClose,
      ...rest
   } = props;

   const { addClassPrefix, merge } = useClass(classPrefix);

   const classes = merge(className, addClassPrefix());

   const Component = as || 'header';

   return (
      <Component {...rest} role={role} className={classes} ref={ref}>
         {children}
         <button onClick={handleClose}>x</button>
      </Component>
   );
});

ModalHeader.displayName = 'Modal-Header';

export default ModalHeader;
