import { useEffect } from 'react';

export function useTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
