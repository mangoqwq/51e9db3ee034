'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Dialog, DialogBody } from '@/components/ui/Dialog';
import { Text } from '@/components/ui/Text';
import { Icon } from '@/components/ui/Icon';
import { EventDetail } from './EventDetail';
import type { Event } from './EventCard';

type EventDetailDialogProps = {
    event: Event | null;
    allEvents: Event[];
    isOpen: boolean;
    onClose: () => void;
};

export function EventDetailDialog({ event, allEvents, isOpen, onClose }: EventDetailDialogProps) {
    const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
    const [copied, setCopied] = useState(false);

    const displayed = viewingEvent ?? event;

    if (!displayed) return null;

    const eventUrl = `/events/${displayed.id}`;

    const handleClose = () => {
        setViewingEvent(null);
        onClose();
    };

    const handleCopyLink = async () => {
        const fullUrl = window.location.origin + eventUrl;
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog isOpen={isOpen} onClose={handleClose} size="lg" title={displayed.name} className="md:h-[80vh]">
            {/* Toolbar */}
            <div className="flex items-center justify-end gap-1 px-4 pt-3">
                <button
                    onClick={handleCopyLink}
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1 focus-visible:ring-offset-surface"
                    aria-label="Copy link"
                    title={copied ? 'Copied!' : 'Copy link'}
                >
                    {copied ? (
                        <Text variant="caption" as="span" className="text-green-600 px-1">Copied!</Text>
                    ) : (
                        <Icon name="copy" size="sm" />
                    )}
                </button>
                <Link
                    href={eventUrl}
                    target="_blank"
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1 focus-visible:ring-offset-surface"
                    aria-label="Open in new page"
                    title="Open in new page"
                >
                    <Icon name="external-link" size="sm" />
                </Link>
                <button
                    onClick={handleClose}
                    className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-1 focus-visible:ring-offset-surface"
                    aria-label="Close"
                    title="Close"
                >
                    <Icon name="close" size="sm" />
                </button>
            </div>

            <DialogBody className="space-y-6 pt-2">
                <EventDetail
                    event={displayed}
                    allEvents={allEvents}
                    onRelatedEventClick={(related) => setViewingEvent(related)}
                />

                {viewingEvent && (
                    <button
                        onClick={() => setViewingEvent(null)}
                        className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-900 cursor-pointer transition-colors duration-150"
                    >
                        &larr; Back to {event?.name}
                    </button>
                )}
            </DialogBody>
        </Dialog>
    );
}
