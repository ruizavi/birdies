import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, test } from 'vitest';
import { PortalProvider } from '../PortalContext';
import { ContextTest, MODAL_ID, ModalTest, props } from './TestComponent';

describe('Modal context', () => {
   afterEach(cleanup);

   test('render children', async () => {
      render(
         <PortalProvider modals={{}}>
            <p>Testing</p>
         </PortalProvider>
      );

      const modalElement = screen.getByText('Testing');

      expect(modalElement).toBeTruthy();
   });

   test('should show and hide modal', async () => {
      render(
         <PortalProvider modals={{ [MODAL_ID]: ModalTest }}>
            <ContextTest />
         </PortalProvider>
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
