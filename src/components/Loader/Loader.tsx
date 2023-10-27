import React, { useCallback } from 'react';
import { COLORS, SIZES } from '../../utils/const';
import { AsProps } from '../../utils/types';
import useClass from '../../utils/useClass';
import propTypes from 'prop-types';

export interface LoaderProps extends AsProps<'div'> {
   speed?: 'slow' | 'normal' | 'fast';
   size?: SIZES;
   center?: boolean;
   message?: string;
   type?: 'bars' | 'spinner' | 'dots' | 'flip' | 'lines';
   color?: COLORS;
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>((props, ref) => {
   const {
      speed = 'normal',
      size = 'sm',
      center = false,
      message,
      type = 'spinner',
      color = 'blue',
      prefix = 'loader',
      className,
      as,
      ...rest
   } = props;

   const { addClassPrefix, merge } = useClass(prefix);

   const classes = merge(className, addClassPrefix(speed, size, type, color, { center }));

   const renderLoader = useCallback(() => {
      return (
         <>
            <span></span>
            {message}
         </>
      );
   }, [speed, size, message, type, color, className, center]);

   const Component = as || 'div';

   const role = 'Loader';

   return (
      <Component {...rest} ref={ref} className={classes} role={role}>
         {renderLoader()}
      </Component>
   );
});

Loader.displayName = 'Loader';
Loader.propTypes = {
   speed: propTypes.oneOf(['slow', 'normal', 'fast']),
   size: propTypes.oneOf(['xs', 'sm', 'md', 'lg']),
   center: propTypes.bool,
   message: propTypes.string,
   type: propTypes.oneOf(['bars', 'spinner', 'dots', 'flip', 'lines']),
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
   ])
};

export default Loader;
