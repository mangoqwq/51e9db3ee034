import Link from "next/link";
import { GetAllEventsQuery } from "@/lib/graphql/events_api/graphql";
import { Card } from "@/components/ui/Card";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { formatTime, formatEventType } from "@/lib/styles";

export type Event = GetAllEventsQuery['sampleEvents'][number];

const BADGE_VARIANTS: Record<string, BadgeVariant> = {
    workshop: 'workshop',
    tech_talk: 'tech_talk',
    activity: 'activity',
};

type EventCardProps = {
    event: Event;
    onClick?: (e: React.MouseEvent) => void;
};

export function EventCard({ event, onClick }: EventCardProps) {
    const startTime = formatTime(event.start_time);
    const endTime = formatTime(event.end_time);
    const variant = BADGE_VARIANTS[event.event_type] ?? 'default';

    return (
        <Link href={`/events/${event.id}`} className="block" onClick={onClick}>
            <Card
                variant="elevated"
                className="cursor-pointer hover:shadow-md transition-shadow duration-150"
            >
                <Text variant="muted" className="mb-2">
                    {startTime} - {endTime}
                </Text>

                <Heading level="h3" size="sm" className="mb-2">
                    {event.name}
                </Heading>

                <Badge variant={variant} size="sm">
                    {formatEventType(event.event_type)}
                </Badge>
            </Card>
        </Link>
    );
}
