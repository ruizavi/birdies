import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, test } from 'vitest';
import { ModalProvider } from '../ModalContext';
import { ContextTest, MODAL_ID, ModalTest, props } from './TestComponent';

describe('Modal context', () => {
   afterEach(cleanup);

   test('render children', async () => {
      render(
         <ModalProvider modals={{}}>
            <p>Testing</p>
         </ModalProvider>
      );

      const modalElement = screen.getByText('Testing');

      expect(modalElement).toBeTruthy();
   });

   test('should show and hide modal', async () => {
      render(
         <ModalProvider modals={{ [MODAL_ID]: ModalTest }}>
            <ContextTest />
         </ModalProvider>
      );
      const textFind = `Modal ${props.id}`;

      const showButton = screen.getByText('show');

      await userEvent.click(showButton);

      const showElement = screen.getByText(textFind);

      expect(showElement).toBeTruthy();

      const hideButton = screen.getByText('hide');

      await userEvent.click(hideButton);

      const hideElement = screen.queryByText(textFind);

      expect(hideElement).toBeNull();
   });
});
