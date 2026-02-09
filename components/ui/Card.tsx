import { cn } from '@/lib/styles';

export type CardVariant = 'default' | 'elevated' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

type CardProps = {
    children: React.ReactNode;
    variant?: CardVariant;
    padding?: CardPadding;
    className?: string;
    onClick?: () => void;
};

const variantStyles: Record<CardVariant, string> = {
    default: 'bg-surface border border-border',
    elevated: 'bg-surface border border-border shadow-sm',
    outlined: 'bg-surface border border-border',
};

const paddingStyles: Record<CardPadding, string> = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
};

export function Card({
    children,
    variant = 'default',
    padding = 'md',
    className,
    onClick,
}: CardProps) {
    return (
        <div
            className={cn(
                'rounded-lg transition-[color,background-color,border-color,box-shadow] duration-150',
                variantStyles[variant],
                paddingStyles[padding],
                className
            )}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
        >
            {children}
        </div>
    );
}
