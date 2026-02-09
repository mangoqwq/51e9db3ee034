'use client';

import { useState } from "react";
import { DateLabel } from "./DateLabel";
import { EventCard, type Event } from "./EventCard";
import { EventDetailDialog } from "./EventDetailDialog";
import { FilterBar } from "./FilterBar";
import { getDateKey } from "@/lib/styles";
import { useAuth } from "@/lib/auth-context";
import { useMediaQuery } from "@/lib/hooks";

type TimelineProps = {
    events: Event[];
};

export function Timeline({ events }: TimelineProps) {
    const { isLoggedIn } = useAuth();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [activeFilters, setActiveFilters] = useState<Set<string>>(
        new Set(['workshop', 'tech_talk', 'activity'])
    );
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const handleToggleFilter = (eventType: string) => {
        setActiveFilters((prev) => {
            const next = new Set(prev);
            if (next.has(eventType)) {
                next.delete(eventType);
            } else {
                next.add(eventType);
            }
            return next;
        });
    };

    // Filter by permission: public always visible, private only when logged in
    let visibleEvents = events.filter(
        (event) => event.permission === 'public' || isLoggedIn
    );

    // Filter by event type if any filters are active
    if (activeFilters.size > 0) {
        visibleEvents = visibleEvents.filter((event) =>
            activeFilters.has(event.event_type)
        );
    }

    // Group events by date (events arrive pre-sorted from server)
    const eventsByDate = visibleEvents.reduce((acc, event) => {
        const dateKey = getDateKey(event.start_time);
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        return acc;
    }, {} as Record<string, Event[]>);

    const handleCardClick = (event: Event, e: React.MouseEvent) => {
        // Cmd/Ctrl+Click: let the browser open in a new tab naturally
        if (e.metaKey || e.ctrlKey) return;

        if (isDesktop) {
            e.preventDefault();
            setSelectedEvent(event);
        }
        // On mobile, let the Link navigate naturally
    };

    return (
        <>
            <div className="mb-6">
                <FilterBar activeFilters={activeFilters} onToggle={handleToggleFilter} />
            </div>

            <div className="space-y-8">
                {Object.entries(eventsByDate).map(([date, dateEvents]) => (
                    <div key={date} className="md:flex md:gap-8">
                        {/* Date label - sticky on both mobile and desktop */}
                        <div className="md:w-28 md:flex-shrink-0">
                            <DateLabel date={date} />
                        </div>

                        {/* Event cards */}
                        <div className="flex-1 space-y-4">
                            {dateEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onClick={(e) => handleCardClick(event, e)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <EventDetailDialog
                event={selectedEvent}
                allEvents={events}
                isOpen={selectedEvent !== null}
                onClose={() => setSelectedEvent(null)}
            />
        </>
    );
}
