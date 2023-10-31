import { AsProps } from '../../utils/types';

export interface ModalBodyProps extends AsProps<'main'>, React.HTMLAttributes<HTMLElement> {
   classPrefix: string;
}
