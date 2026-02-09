import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eventsApiClient } from '@/lib/graphql/client';
import { GET_ALL_EVENTS } from '@/lib/graphql/queries';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import { EventDetail } from '../../_components/EventDetail';

type Params = { id: string };

export default async function EventPage({ params }: { params: Promise<Params> }) {
    const { id } = await params;
    const eventId = Number(id);

    const { data } = await eventsApiClient.query({
        query: GET_ALL_EVENTS,
    });

    const allEvents = data?.sampleEvents ?? [];
    const event = allEvents.find((e) => e.id === eventId);

    if (!event) {
        notFound();
    }

    return (
        <Container size="md" className="py-8">
            <Link href="/" className="inline-block mb-6 text-muted-foreground hover:text-foreground transition-colors duration-150">
                <Text variant="small" as="span">&larr; Back to Events</Text>
            </Link>
            <EventDetail event={event} allEvents={allEvents} />
        </Container>
    );
}
