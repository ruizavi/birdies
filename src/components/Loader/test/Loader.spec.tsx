import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Loader from '../';

describe('Loader component', () => {
   afterEach(cleanup);

   it('should render Loader', () => {
      render(<Loader />);
   });

   it('should output a Loader', () => {
      render(<Loader />);

      screen.findByDisplayValue('Loader');
   });

   it('should output a div > span', () => {
      render(<Loader />);

      const loaderContainer = screen.getByRole('Loader');
      const spanElement = loaderContainer.querySelector('span');

      expect(loaderContainer.tagName).toBe('DIV');
      expect(spanElement).toBeTruthy();
   });

   it('should have a default classes', () => {
      const { getByRole } = render(<Loader />);

      const loader = getByRole('Loader');

      const classes = loader.classList;

      const defaultClasses = [
         'bird-loader',
         'bird-loader-normal',
         'bird-loader-sm',
         'bird-loader-spinner',
         'bird-loader-blue'
      ];

      defaultClasses.forEach(cls => {
         expect(classes.contains(cls)).toBe(true);
      });
   });
});
