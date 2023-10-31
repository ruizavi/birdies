import React, { useMemo } from 'react';
import { SIZES } from '../../utils/const';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';
import ModalContext, { ModalContextProps } from './ModalContext';

export interface ModalProps extends AsProps<'div'>, React.HTMLAttributes<HTMLElement> {
   size?: SIZES | 'full';
   onModalClose?: (e: React.MouseEvent) => void;
}

const ModalBase = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
   const {
      as,
      children,
      className,
      role = 'dialog',
      prefix = 'modal',
      size = 'lg',
      onModalClose,
      ...rest
   } = props;

   const { addClassPrefix, merge } = useClass(prefix);

   const classes = merge(className, addClassPrefix(size));

   const Component = as || 'div';

   const modalContextProps = useMemo<ModalContextProps>(() => ({ onModalClose }), [onModalClose]);

   return (
      <ModalContext.Provider value={modalContextProps}>
         <Component {...rest} ref={ref} className={classes} role={role}>
            {children}
         </Component>
      </ModalContext.Provider>
   );
});

ModalBase.displayName = 'Modal';

export default ModalBase;
