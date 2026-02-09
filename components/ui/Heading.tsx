import { cn } from '@/lib/styles';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm';

type HeadingProps = {
  children: React.ReactNode;
  level?: HeadingLevel;
  size?: HeadingSize;
  className?: string;
};

const sizeStyles: Record<HeadingSize, string> = {
  xl: 'text-3xl font-semibold tracking-tight',
  lg: 'text-2xl font-semibold tracking-tight',
  md: 'text-xl font-semibold',
  sm: 'text-lg font-medium',
};

export function Heading({
  children,
  level = 'h2',
  size = 'md',
  className,
}: HeadingProps) {
  const Component = level;

  return (
    <Component className={cn(sizeStyles[size], 'text-foreground', className)}>
      {children}
    </Component>
  );
}
