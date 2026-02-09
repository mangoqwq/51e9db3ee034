'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { LoginDialog } from './LoginDialog';
import { SearchDialog } from './SearchDialog';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';

function useClock() {
    return useSyncExternalStore(
        (onStoreChange) => {
            const id = setInterval(onStoreChange, 1000);
            return () => clearInterval(id);
        },
        () => {
            return new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZoneName: 'short',
            });
        },
        () => '' // SSR: render nothing to avoid hydration mismatch
    );
}

export function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const clock = useClock();

    // Cmd/Ctrl+K keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <nav className="border-b border-border bg-surface sticky top-0 z-30">
                <Container className="py-3">
                    <div className="flex items-center justify-between">
                        {/* Left: Logo + Title */}
                        <Link href="/" className="flex items-center gap-3 no-underline">
                            <Logo size="md" />
                            <Text variant="body" as="span" className="text-lg font-semibold">
                                Hack the North
                            </Text>
                        </Link>

                        {/* Right: Search icon + Login button */}
                        <div className="flex items-center gap-3">
                            {/* Mobile: icon button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label="Search"
                                onClick={() => setIsSearchOpen(true)}
                                className="md:hidden"
                            >
                                <Icon name="search" size="md" />
                            </Button>

                            {/* Desktop: wide search bar */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="hidden md:flex items-center gap-2 px-3 py-1.5 h-10 rounded-lg border border-border text-muted-foreground hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-150 cursor-pointer w-64"
                            >
                                <Icon name="search" size="sm" className="text-muted-foreground" />
                                <span className="flex-1 text-sm text-left">Search events...</span>
                                <kbd className="text-xs font-mono px-1.5 py-0.5 bg-gray-50 dark:bg-gray-800 rounded border border-border text-muted-foreground">
                                    ⌘K
                                </kbd>
                            </button>

                            {clock && (
                                <Text variant="caption" as="span" className="hidden sm:inline tabular-nums">
                                    {clock}
                                </Text>
                            )}

                            <button
                                onClick={toggleTheme}
                                className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size="md" />
                            </button>

                            {isLoggedIn ? (
                                <Button variant="outline" size="sm" onClick={logout}>
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setIsLoginOpen(true)}
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </Container>
            </nav>

            <LoginDialog isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
