import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense } from 'react';

const defaultFallback = null;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
  fallback?: React.ReactNode;
}

export const LucideIconByName = ({
  name,
  fallback,
  ...props
}: Readonly<IconProps>): React.ReactNode => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback ?? defaultFallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};
