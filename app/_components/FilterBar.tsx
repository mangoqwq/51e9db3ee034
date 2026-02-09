'use client';

import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { formatEventType } from '@/lib/styles';

const EVENT_TYPES = ['workshop', 'tech_talk', 'activity'] as const;

const BADGE_VARIANTS: Record<string, BadgeVariant> = {
    workshop: 'workshop',
    tech_talk: 'tech_talk',
    activity: 'activity',
};

type FilterBarProps = {
    activeFilters: Set<string>;
    onToggle: (eventType: string) => void;
};

export function FilterBar({ activeFilters, onToggle }: FilterBarProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map((type) => {
                const isActive = activeFilters.has(type);
                const variant = isActive ? BADGE_VARIANTS[type] : 'default';

                return (
                    <button
                        key={type}
                        onClick={() => onToggle(type)}
                        className="cursor-pointer transition-opacity duration-150"
                    >
                        <Badge
                            variant={variant}
                            size="sm"
                            className={!isActive ? 'opacity-50' : undefined}
                        >
                            {formatEventType(type)}
                        </Badge>
                    </button>
                );
            })}
        </div>
    );
}
