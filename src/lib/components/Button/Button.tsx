import React, { useCallback } from 'react';
import useClass from '../../utils/useClass';
import { COLORS, SIZES } from '../../utils/const';
import { AsProps } from '../../utils/types';
import propTypes from 'prop-types';

export interface ButtonProps extends AsProps<'button'>, React.HTMLAttributes<HTMLElement> {
   appearence?: 'solid' | 'border' | 'link';
   color?: COLORS;
   size?: SIZES;
   type?: 'submit' | 'reset' | 'button';
   disabled?: boolean;
   actived?: boolean;
   block?: boolean;
   isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
   const {
      appearence = 'solid',
      color = 'green',
      size = 'sm',
      prefix = 'btn',
      className,
      children,
      as,
      type = 'button',
      disabled,
      actived,
      block,
      isLoading,
      role = 'button',
      ...rest
   } = props;

   const { merge, addClassPrefix } = useClass(prefix);

   const classes = merge(
      className,
      addClassPrefix(appearence, size, color, { disabled, actived, block, isLoading })
   );

   const Component = as || 'button';

   const renderButton = useCallback(() => {
      return isLoading ? <span></span> : <>{children}</>;
   }, [appearence, color, size, className, children, actived, block, isLoading, disabled]);

   return (
      <Component
         {...rest}
         type={type}
         ref={ref}
         className={classes}
         disabled={disabled}
         role={role}
      >
         {renderButton()}
      </Component>
   );
});

Button.displayName = 'Button';

Button.propTypes = {
   appearence: propTypes.oneOf(['solid', 'border', 'link']),
   color: propTypes.oneOf([
      'white',
      'cream',
      'deep',
      'air',
      'blue',
      'red',
      'pink',
      'green',
      'yellow',
      'orange',
      'purple'
   ]),
   size: propTypes.oneOf(['xs', 'sm', 'md', 'lg']),
   type: propTypes.oneOf(['submit', 'reset', 'button']),
   disabled: propTypes.bool,
   actived: propTypes.bool,
   block: propTypes.bool,
   isLoading: propTypes.bool,
   children: propTypes.node
};

export default Button;
