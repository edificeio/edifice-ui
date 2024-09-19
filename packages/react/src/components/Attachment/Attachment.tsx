import { ComponentPropsWithRef, forwardRef, ReactNode, Ref } from 'react';
import { Icon } from '..';

export interface AttachmentProps extends ComponentPropsWithRef<'div'> {
  /**
   * Name of resource or Folder
   * */
  name?: string;
  /**
   * Actions attachment
   * */
  options: ReactNode | undefined;
}

export type AttachmentType = AttachmentProps;

export const Attachment = forwardRef(
  (
    { name = 'Attachment Name', options, ...restProps }: AttachmentProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} className="attachment px-12 py-8" {...restProps}>
        <Icon name="paperclip" size="22" />
        <div className="filename text-truncate">{name}</div>
        {options && <div className="options ps-12">{options}</div>}
      </div>
    );
  },
);

Attachment.displayName = 'Attachment';

export default Attachment;
