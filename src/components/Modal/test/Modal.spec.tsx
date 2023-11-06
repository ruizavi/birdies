import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import TestModal from './TestComponent';

describe('Modal component', () => {
   afterEach(cleanup);

   test('should render Modal', () => {
      render(<TestModal />);
   });

   test('should modal have dialog role', () => {
      render(<TestModal />);

      screen.getByRole('dialog');
   });

   test('should render modal header', () => {
      render(<TestModal />);

      const modal = screen.getByRole('dialog');

      const header = modal.firstChild;

      expect(header?.nodeName).toBe('HEADER');
   });

   test('should render modal title', () => {
      render(<TestModal />);

      screen.getByText('Title');
   });

   test('should render modal body', () => {
      render(<TestModal />);

      screen.getByText('Content');
   });

   test('should render modal title', () => {
      render(<TestModal />);

      screen.getByText('Footer');
   });
});
