import React from 'react';
import { AsProps } from '../../utils/types';

export interface ModalHeaderProps extends AsProps<'header'>, React.HTMLAttributes<HTMLElement> {
   classPrefix?: string;
   handleClose?: () => void;
}

const ModalHeader = React.forwardRef<HTMLHeadElement, ModalHeaderProps>((props, ref) => {
   return (
      <header ref={ref}>
         header <button onClick={props.handleClose}>x</button>{' '}
      </header>
   );
});

ModalHeader.displayName = 'Modal-Header';

export default ModalHeader;
