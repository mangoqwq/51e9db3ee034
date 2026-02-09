'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@/components/ui/Dialog';
import { Icon } from '@/components/ui/Icon';
import { Text } from '@/components/ui/Text';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { useSearch } from '@/lib/use-search';
import { formatTime, formatDate, formatEventType, cn } from '@/lib/styles';

type SearchDialogProps = {
    isOpen: boolean;
    onClose: () => void;
};

const BADGE_VARIANTS: Record<string, BadgeVariant> = {
    workshop: 'workshop',
    tech_talk: 'tech_talk',
    activity: 'activity',
};

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const { query, setQuery, results, reset } = useSearch();
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleClose = useCallback(() => {
        reset();
        setActiveIndex(-1);
        onClose();
    }, [onClose, reset]);

    // Auto-focus input when dialog opens
    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
        }
    }, [isOpen]);

    // Reset active index when results change
    useEffect(() => {
        setActiveIndex(results.length > 0 ? 0 : -1);
    }, [results.length]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev < results.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : results.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < results.length) {
                    navigateToEvent(results[activeIndex].event.id);
                }
                break;
        }
    };

    const navigateToEvent = (eventId: number) => {
        handleClose();
        router.push(`/events/${eventId}`);
    };

    // Scroll active result into view
    useEffect(() => {
        if (activeIndex >= 0) {
            const el = document.querySelector(`[data-search-index="${activeIndex}"]`);
            el?.scrollIntoView({ block: 'nearest' });
        }
    }, [activeIndex]);

    return (
        <Dialog isOpen={isOpen} onClose={handleClose} size="xl" title="Search events" className="top-[15vh] -translate-y-0">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Icon name="search" size="md" className="text-muted-foreground flex-shrink-0" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search events..."
                    className="flex-1 text-base text-foreground outline-none placeholder:text-muted-foreground bg-transparent"
                    aria-label="Search events"
                    aria-activedescendant={
                        activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
                    }
                    role="combobox"
                    aria-expanded={results.length > 0}
                    aria-controls="search-results"
                    aria-autocomplete="list"
                />
                {query && (
                    <button
                        onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                        className="cursor-pointer p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
                        aria-label="Clear search"
                    >
                        <Icon name="close" size="sm" className="text-muted-foreground" />
                    </button>
                )}
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs font-mono text-muted-foreground bg-gray-100 dark:bg-gray-800 rounded border border-border">
                    ESC
                </kbd>
            </div>

            {/* Results */}
            <div
                id="search-results"
                role="listbox"
                className="max-h-[min(60vh,_24rem)] overflow-y-auto"
            >
                {/* Empty state: no results */}
                {results.length === 0 && (
                    <div className="px-4 py-8 text-center">
                        <Text variant="muted">No events found for &ldquo;{query}&rdquo;</Text>
                    </div>
                )}

                {/* Result items */}
                {results.map((result, index) => {
                    const { event, matchField } = result;
                    const isActive = index === activeIndex;
                    const variant = BADGE_VARIANTS[event.event_type] ?? 'default';

                    return (
                        <button
                            key={event.id}
                            id={`search-result-${index}`}
                            data-search-index={index}
                            role="option"
                            aria-selected={isActive}
                            onClick={() => navigateToEvent(event.id)}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={cn(
                                'w-full text-left px-4 py-3 cursor-pointer transition-colors duration-150',
                                'border-b border-border/50 last:border-b-0',
                                'flex items-center gap-3',
                                isActive ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                            )}
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <Text variant="body" as="span" className="font-medium truncate">
                                        {event.name}
                                    </Text>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Text variant="caption" as="span">
                                        {formatDate(event.start_time)} &middot; {formatTime(event.start_time)}
                                    </Text>
                                    {matchField === 'speaker' && (
                                        <Text variant="caption" as="span">
                                            &middot; Speaker match
                                        </Text>
                                    )}
                                    {matchField === 'description' && (
                                        <Text variant="caption" as="span">
                                            &middot; Description match
                                        </Text>
                                    )}
                                </div>
                            </div>
                            <Badge variant={variant} size="sm" className="flex-shrink-0">
                                {formatEventType(event.event_type)}
                            </Badge>
                        </button>
                    );
                })}
            </div>

            {/* Footer hints */}
            {results.length > 0 && (
                <div className="px-4 py-2 border-t border-border flex items-center gap-4">
                    <Text variant="caption" as="span">
                        <kbd className="font-mono px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs border border-border mr-1">&uarr;</kbd>
                        <kbd className="font-mono px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs border border-border mr-1">&darr;</kbd>
                        to navigate
                    </Text>
                    <Text variant="caption" as="span">
                        <kbd className="font-mono px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs border border-border mr-1">&crarr;</kbd>
                        to select
                    </Text>
                </div>
            )}
        </Dialog>
    );
}
