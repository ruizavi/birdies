import React from 'react';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';

export interface ModalTitleProps extends AsProps<'h4'>, React.HTMLAttributes<HTMLElement> {
   classPrefix?: string;
}

const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>((props, ref) => {
   const { role, classPrefix = 'modal-title', as = 'h4', className, children, ...rest } = props;

   const { addClassPrefix, merge } = useClass(classPrefix);

   const classes = merge(className, addClassPrefix());

   const Component = as || 'h4';

   const render = () => {
      return <>{children}</>;
   };

   return (
      <Component {...rest} role={role} className={classes} ref={ref}>
         {render()}
      </Component>
   );
});

ModalTitle.displayName = 'Modal-Title';

export default ModalTitle;
