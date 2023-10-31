import React from 'react';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';

export interface ModalBodyProps extends AsProps<'main'>, React.HTMLAttributes<HTMLElement> {
   classPrefix?: string;
}

const ModalBody = React.forwardRef<HTMLHeadingElement, ModalBodyProps>((props, ref) => {
   const { role, classPrefix = 'modal-body', as = 'main', className, children, ...rest } = props;

   const { addClassPrefix, merge } = useClass(classPrefix);

   const classes = merge(className, addClassPrefix());

   const Component = as || 'main';

   const render = () => {
      return <>{children}</>;
   };

   return (
      <Component {...rest} role={role} className={classes} ref={ref}>
         {render()}
      </Component>
   );
});

ModalBody.displayName = 'Modal-Body';

export default ModalBody;
