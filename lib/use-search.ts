'use client';

import { useState, useMemo } from 'react';
import { useEvents } from './events-context';
import { useAuth } from './auth-context';
import type { GetAllEventsQuery } from '@/lib/graphql/events_api/graphql';

type Event = GetAllEventsQuery['sampleEvents'][number];

export type SearchResult = {
    event: Event;
    score: number;
    matchField: 'name' | 'description' | 'speaker';
};

export function useSearch() {
    const { events } = useEvents();
    const { isLoggedIn } = useAuth();
    const [query, setQuery] = useState('');

    const results: SearchResult[] = useMemo(() => {
        const permittedEvents = events.filter(
            (event) => event.permission === 'public' || isLoggedIn
        );

        const trimmed = query.trim().toLowerCase();

        // Empty query: show all permitted events sorted by start_time
        if (trimmed.length === 0) {
            return permittedEvents.map((event) => ({
                event,
                score: 0,
                matchField: 'name' as const,
            }));
        }

        const scored: SearchResult[] = [];

        for (const event of permittedEvents) {
            const nameLower = event.name.toLowerCase();
            const descLower = (event.description ?? '').toLowerCase();
            const speakerNames = event.speakers
                .map((s) => s.name.toLowerCase())
                .join(' ');

            if (nameLower.includes(trimmed)) {
                const score = nameLower.startsWith(trimmed) ? 100 : 80;
                scored.push({ event, score, matchField: 'name' });
            } else if (speakerNames.includes(trimmed)) {
                scored.push({ event, score: 60, matchField: 'speaker' });
            } else if (descLower.includes(trimmed)) {
                scored.push({ event, score: 40, matchField: 'description' });
            }
        }

        scored.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.event.start_time - b.event.start_time;
        });

        return scored;
    }, [query, events, isLoggedIn]);

    const reset = () => setQuery('');

    return { query, setQuery, results, reset };
}
