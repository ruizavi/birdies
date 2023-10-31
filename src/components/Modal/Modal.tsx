import React from 'react';
import { AsProps } from '../../utils/types';
import { SIZES } from '../../utils/const';
import useClass from '../../utils/useClass';

interface ModalHeaderProps extends AsProps<'header'>, React.HTMLAttributes<HTMLElement> {
   classPrefix?: string;
   handleClose?: () => void;
}

interface ModalTitleProps extends AsProps<'h4'>, React.HTMLAttributes<HTMLElement> {
   classPrefix: string;
}

interface ModalBodyProps extends AsProps<'main'>, React.HTMLAttributes<HTMLElement> {
   classPrefix: string;
}

interface ModalFooterProps extends AsProps<'footer'>, React.HTMLAttributes<HTMLElement> {
   classPrefix: string;
}

interface ModalProps extends AsProps<'div'>, React.HTMLAttributes<HTMLElement> {
   size?: SIZES | 'full';
   handleClose?: () => void;
}

const ModalHeader = React.forwardRef<HTMLHeadElement, ModalHeaderProps>(() => {
   return <header>header</header>;
});

ModalHeader.displayName = 'Modal-header';

interface ModalComponent
   extends React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>> {
   Header: typeof ModalHeader;
}

const forward = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
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

forward.displayName = 'Modal';

const Modal = {
   ...forward,
   Header: ModalHeader
} as ModalComponent;

export default Modal;
