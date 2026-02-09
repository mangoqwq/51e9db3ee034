import { cn } from '@/lib/styles';

export type TextVariant = 'body' | 'small' | 'caption' | 'muted';

type TextProps = {
  children: React.ReactNode;
  variant?: TextVariant;
  className?: string;
  as?: 'p' | 'span' | 'div';
};

const variantStyles: Record<TextVariant, string> = {
  body: 'text-base text-foreground leading-relaxed',
  small: 'text-sm text-muted-foreground',
  caption: 'text-xs text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
};

export function Text({
  children,
  variant = 'body',
  className,
  as = 'p',
}: TextProps) {
  const Component = as;

  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  );
}
