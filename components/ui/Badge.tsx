import { cn } from '@/lib/styles';

export type BadgeVariant = 'default' | 'workshop' | 'tech_talk' | 'activity';
export type BadgeSize = 'sm' | 'md' | 'lg';

type BadgeProps = {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
};

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 dark:bg-gray-800 text-muted-foreground',
    workshop: 'bg-event-workshop-light text-event-workshop',
    tech_talk: 'bg-event-tech-talk-light text-event-tech-talk',
    activity: 'bg-event-activity-light text-event-activity',
};

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
};

export function Badge({
    children,
    variant = 'default',
    size = 'md',
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-block rounded-full font-medium transition-[color,background-color,opacity] duration-150',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
        >
            {children}
        </span>
    );
}
