import { useCallback } from 'react';
import { message } from '@/utils/messageNexus';
import useTranslations from '@/hooks/useTranslations';

export const useClipboard = () => {
  const { t } = useTranslations();

  const clipboardSuccess = useCallback(() => {
    message.success(t('common.copy.success'));
  }, [t]);

  const clipboardError = useCallback(() => {
    message.error(t('common.copy.error'));
  }, [t]);

  const clipboard = useCallback(
    (text: string) => {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            clipboardSuccess();
          })
          .catch(() => {
            clipboardError();
          });
        return;
      }
      // clipboard fallback
      const inputElement = document.createElement('input');
      inputElement.value = text;
      inputElement.style.position = 'absolute';
      inputElement.style.visibility = 'none';
      document.body.appendChild(inputElement);
      inputElement.select();
      document.execCommand('copy');
      clipboardSuccess();
      inputElement.remove();
    },
    [clipboardSuccess, clipboardError],
  );

  return {
    clipboard,
  };
};
