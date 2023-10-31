import React from 'react';
import { SIZES } from '../../utils/const';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';
import { ModalBodyProps } from './ModalBody';
import { ModalFooterProps } from './ModalFooter';
import { ModalHeaderProps } from './ModalHeader';
import { ModalTitleProps } from './ModalTitle';

export interface ModalProps extends AsProps<'div'>, React.HTMLAttributes<HTMLElement> {
   size?: SIZES | 'full';
   handleClose?: () => void;
}

const ModalBase = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
   const {
      as,
      children,
      className,
      role = 'dialog',
      prefix = 'modal',
      size = 'lg',
      handleClose,
      ...rest
   } = props;

   const { addClassPrefix, merge } = useClass(prefix);

   const classes = merge(className, addClassPrefix(size));

   const Component = as || 'div';

   const renderModal = () => {
      return (
         <>
            {React.Children.map(children, child => {
               if (React.isValidElement<ModalHeaderProps>(child)) {
                  return React.cloneElement(child, {
                     as: 'header',
                     classPrefix: 'modal-header',
                     handleClose
                  });
               }
               if (React.isValidElement<ModalTitleProps>(child)) {
                  return React.cloneElement(child, { as: 'h4', classPrefix: 'modal-title' });
               }
               if (React.isValidElement<ModalBodyProps>(child)) {
                  return React.cloneElement(child, { as: 'main', classPrefix: 'modal-main' });
               }
               if (React.isValidElement<ModalFooterProps>(child)) {
                  return React.cloneElement(child, { as: 'footer', classPrefix: 'modal-footer' });
               }

               return child;
            })}
         </>
      );
   };

   return (
      <Component {...rest} ref={ref} className={classes} role={role}>
         {renderModal()}
      </Component>
   );
});

ModalBase.displayName = 'Modal';

export default ModalBase;
