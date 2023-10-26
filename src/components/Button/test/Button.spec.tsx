import { afterEach, describe, expect, test } from 'vitest';
import { render, cleanup, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button element', () => {
   afterEach(cleanup);

   const children = 'Test';

   test('should render button', () => {
      render(<Button>{children}</Button>);
   });

   test('should output a button', () => {
      render(<Button>{children}</Button>);

      screen.getByRole('button');
   });

   test('should render children', () => {
      render(<Button>{children}</Button>);

      screen.getByText(children);
   });

   test('should have a default classes', () => {
      const { getByRole } = render(<Button>{children}</Button>);

      const button = getByRole('button');

      const classes = button.classList;

      const defaultClasses = ['bird-btn', 'bird-btn-solid', 'bird-btn-sm', 'bird-btn-green'];

      defaultClasses.forEach(cls => {
         expect(classes.contains(cls)).toBe(true);
      });
   });

   test('should show a loader in the button', () => {
      const { getByRole } = render(<Button isLoading>{children}</Button>);

      const loader = getByRole('button');

      const classes = loader.classList;

      expect(classes.contains('bird-btn-isLoading')).toBe(true);
   });
});
