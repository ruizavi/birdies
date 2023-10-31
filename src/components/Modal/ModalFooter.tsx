import { AsProps } from '../../utils/types';

export interface ModalFooterProps extends AsProps<'footer'>, React.HTMLAttributes<HTMLElement> {
   classPrefix: string;
}
