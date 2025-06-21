'use client';
import { useEffect, useState } from 'react';
import SiteReachedAnimation from './SiteReachedAnimation';

export default function LoadingWrapper({
  children,
}: {
  children: (loadingComplete: boolean) => React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setTimeout(() => setLoadingComplete(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      {!loadingComplete && <SiteReachedAnimation />}
      {loadingComplete && children(true)}
    </>
  );
}
