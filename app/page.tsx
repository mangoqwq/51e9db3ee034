import { eventsApiClient } from "@/lib/graphql/client";
import { GET_ALL_EVENTS } from "@/lib/graphql/queries";

export default async function Page() {
    const { data } = await eventsApiClient.query({
        query: GET_ALL_EVENTS,
    });

    const events = data?.sampleEvents ?? [];
    console.log(events);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Events</h1>
            <div className="space-y-2">
                {events.map((event) => (
                    <div key={event.id} className="border p-4 rounded">
                        <h2 className="font-semibold">{event.name}</h2>
                        <p className="text-sm text-gray-600">{event.event_type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
