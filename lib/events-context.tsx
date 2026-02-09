'use client';

import { createContext, useContext } from 'react';
import type { GetAllEventsQuery } from '@/lib/graphql/events_api/graphql';

type Event = GetAllEventsQuery['sampleEvents'][number];

type EventsContextType = {
    events: Event[];
};

const EventsContext = createContext<EventsContextType | null>(null);

type EventsProviderProps = {
    events: Event[];
    children: React.ReactNode;
};

export function EventsProvider({ events, children }: EventsProviderProps) {
    return (
        <EventsContext.Provider value={{ events }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventsProvider');
    }
    return context;
}
