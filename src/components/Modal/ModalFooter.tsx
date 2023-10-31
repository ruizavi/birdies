import React from 'react';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';

export interface ModalFooterProps extends AsProps<'footer'>, React.HTMLAttributes<HTMLElement> {
   classPrefix?: string;
}

const ModalFooter = React.forwardRef<HTMLHeadingElement, ModalFooterProps>((props, ref) => {
   const {
      role,
      classPrefix = 'modal-footer',
      as = 'footer',
      className,
      children,
      ...rest
   } = props;

   const { addClassPrefix, merge } = useClass(classPrefix);

   const classes = merge(className, addClassPrefix());

   const Component = as || 'footer';

   const render = () => {
      return <>{children}</>;
   };

   return (
      <Component {...rest} role={role} className={classes} ref={ref}>
         {render()}
      </Component>
   );
});

ModalFooter.displayName = 'Modal-Footer';

export default ModalFooter;
