'use client';

import Link from 'next/link';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { formatTime, formatDate, formatEventType } from '@/lib/styles';
import { useAuth } from '@/lib/auth-context';
import type { Event } from './EventCard';

const BADGE_VARIANTS: Record<string, BadgeVariant> = {
    workshop: 'workshop',
    tech_talk: 'tech_talk',
    activity: 'activity',
};

type EventDetailProps = {
    event: Event;
    allEvents: Event[];
    onRelatedEventClick?: (event: Event) => void;
};

export function EventDetail({ event, allEvents, onRelatedEventClick }: EventDetailProps) {
    const { isLoggedIn } = useAuth();

    const variant = BADGE_VARIANTS[event.event_type] ?? 'default';
    const startTime = formatTime(event.start_time);
    const endTime = formatTime(event.end_time);
    const date = formatDate(event.start_time);

    const relatedEvents = event.related_events
        .map((id) => allEvents.find((e) => e.id === id))
        .filter((e): e is Event => e != null)
        .filter((e) => e.permission === 'public' || isLoggedIn);

    if (event.permission === 'private' && !isLoggedIn) {
        return (
            <div className="py-12 text-center">
                <Text variant="muted">This event is private. Please log in to view it.</Text>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Badge variant={variant} size="sm">
                        {formatEventType(event.event_type)}
                    </Badge>
                    {event.permission === 'private' && (
                        <Badge variant="default" size="sm">Private</Badge>
                    )}
                </div>
                <Heading level="h2" size="lg">
                    {event.name}
                </Heading>
                <Text variant="muted" className="mt-1">
                    {date} &middot; {startTime} - {endTime}
                </Text>
            </div>

            {/* Description */}
            {event.description && (
                <div>
                    <Text variant="small" as="span" className="font-medium text-muted-foreground uppercase tracking-wide text-xs mb-2 block">
                        Description
                    </Text>
                    <Text variant="body">{event.description}</Text>
                </div>
            )}

            {/* Speakers */}
            {event.speakers.length > 0 && (
                <div>
                    <Text variant="small" as="span" className="font-medium text-muted-foreground uppercase tracking-wide text-xs mb-2 block">
                        Speakers
                    </Text>
                    <div className="flex flex-wrap gap-2">
                        {event.speakers.map((speaker) => (
                            <Badge key={speaker.name} variant="default" size="sm">
                                {speaker.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {/* Links */}
            {(event.public_url || (isLoggedIn && event.private_url)) && (
                <div>
                    <Text variant="small" as="span" className="font-medium text-muted-foreground uppercase tracking-wide text-xs mb-2 block">
                        Links
                    </Text>
                    <div className="flex flex-col gap-1">
                        {event.public_url && (
                            <a
                                href={event.public_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground underline underline-offset-2 decoration-border hover:decoration-foreground text-sm transition-colors duration-150"
                            >
                                Public Link
                            </a>
                        )}
                        {isLoggedIn && event.private_url && (
                            <a
                                href={event.private_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-foreground underline underline-offset-2 decoration-border hover:decoration-foreground text-sm transition-colors duration-150"
                            >
                                Private Link (Hackers Only)
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* Related Events */}
            {relatedEvents.length > 0 && (
                <div>
                    <Text variant="small" as="span" className="font-medium text-muted-foreground uppercase tracking-wide text-xs mb-2 block">
                        Related Events
                    </Text>
                    <div className="space-y-3">
                        {relatedEvents.map((related) => {
                            const relVariant = BADGE_VARIANTS[related.event_type] ?? 'default';

                            if (onRelatedEventClick) {
                                return (
                                    <Card
                                        key={related.id}
                                        variant="outlined"
                                        padding="sm"
                                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                                        onClick={() => onRelatedEventClick(related)}
                                    >
                                        <RelatedEventContent event={related} variant={relVariant} />
                                    </Card>
                                );
                            }

                            return (
                                <Link key={related.id} href={`/events/${related.id}`} className="block">
                                    <Card
                                        variant="outlined"
                                        padding="sm"
                                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                                    >
                                        <RelatedEventContent event={related} variant={relVariant} />
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

function RelatedEventContent({ event, variant }: { event: Event; variant: BadgeVariant }) {
    return (
        <div className="flex items-center justify-between gap-2">
            <div>
                <Text variant="small" as="span" className="font-medium text-foreground">
                    {event.name}
                </Text>
                <Text variant="muted" className="text-xs">
                    {formatDate(event.start_time)} &middot; {formatTime(event.start_time)}
                </Text>
            </div>
            <Badge variant={variant} size="sm">
                {formatEventType(event.event_type)}
            </Badge>
        </div>
    );
}
