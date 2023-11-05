import React, { useMemo, useState } from 'react';
import { SIZES } from '../../utils/const';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';
import ModalContext, { ModalContextProps } from './ModalContext';
import ModalContainer from './ModalContainer';

export interface ModalProps extends AsProps<'div'>, React.HTMLAttributes<HTMLElement> {
   size?: SIZES | 'full';
   open?: boolean;
   onModalClose: (e?: React.MouseEvent) => void;
}

const ModalBase = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
   const {
      as,
      children,
      className,
      role = 'dialog',
      prefix = 'modal',
      size = 'lg',
      open,
      onModalClose,
      ...rest
   } = props;

   const [isHidden, setIsHidden] = useState(false);

   const { addClassPrefix, merge } = useClass(prefix);

   const classes = merge(className, addClassPrefix(size));

   const Component = as || 'div';

   const modalContextProps = useMemo<ModalContextProps>(
      () => ({
         onModalClose: () => {
            setIsHidden(true);
            setTimeout(() => {
               onModalClose();
               setIsHidden(false);
            }, 998);
         }
      }),
      [onModalClose]
   );

   const render = () => (
      <ModalContext.Provider value={modalContextProps}>
         <ModalContainer isHidden={isHidden}>
            <Component {...rest} ref={ref} className={classes} role={role}>
               {children}
            </Component>
         </ModalContainer>
      </ModalContext.Provider>
   );

   if (open != null) {
      return open ? render() : null;
   }

   return render();
});

ModalBase.displayName = 'Modal';

export default ModalBase;
