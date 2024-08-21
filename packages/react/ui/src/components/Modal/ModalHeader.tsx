import { ReactNode, useEffect, useRef } from 'react';

import { Close } from '@edifice-ui/icons';
import { useTranslation } from 'react-i18next';

import { useModalContext } from './ModalContext';
import IconButton from '../Button/IconButton';

export interface ModalHeaderProps {
  /**
   * Method called on modal close
   */
  onModalClose: () => void;
  /**
   * ReactNode
   */
  children: ReactNode;
}

/**
 * Modal Header
 */
const ModalHeader = (props: ModalHeaderProps) => {
  const { onModalClose, children } = props;
  const { ariaLabelId, focusId } = useModalContext();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!focusId) {
      closeButtonRef.current?.focus();
    }
  }, [focusId]);

  return (
    <div className="modal-header">
      <h2 id={ariaLabelId} className="modal-title" tabIndex={-1}>
        {children}
      </h2>
      <IconButton
        ref={closeButtonRef}
        aria-label={t('close')}
        color="tertiary"
        icon={<Close />}
        type="button"
        variant="ghost"
        title={t('close')}
        onClick={onModalClose}
        className="btn-close"
      />
    </div>
  );
};

ModalHeader.displayName = 'Modal.Header';

export default ModalHeader;
