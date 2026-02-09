import { eventsApiClient } from "@/lib/graphql/client";
import { GET_ALL_EVENTS } from "@/lib/graphql/queries";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Timeline } from "./_components/Timeline";

export default async function Page() {
    const { data } = await eventsApiClient.query({
        query: GET_ALL_EVENTS,
    });

    const events = [...(data?.sampleEvents ?? [])].sort(
        (a, b) => a.start_time - b.start_time
    );

    return (
        <Container size="sm" className="py-10">
            <Heading level="h1" size="xl" className="mb-10">
                Events
            </Heading>
            <Timeline events={events} />
        </Container>
    );
}
