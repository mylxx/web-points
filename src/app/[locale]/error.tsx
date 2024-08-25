'use client';

import { useEffect } from 'react';
import useTranslations from '@/hooks/useTranslations';

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  const { rich } = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      {rich('common.error.description', {
        p: (chunks) => <p className="mt-4">{chunks}</p>,
        retry: (chunks) => (
          <button
            className="text-white underline underline-offset-2"
            onClick={reset}
            type="button"
          >
            {chunks}
          </button>
        ),
      })}
    </div>
  );
}
