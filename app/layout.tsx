import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { EventsProvider } from "@/lib/events-context";
import { eventsApiClient } from "@/lib/graphql/client";
import { GET_ALL_EVENTS } from "@/lib/graphql/queries";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hack the North Events",
    description: "Event timeline and schedule for Hack the North",
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data } = await eventsApiClient.query({ query: GET_ALL_EVENTS });
    const events = [...(data?.sampleEvents ?? [])].sort(
        (a, b) => a.start_time - b.start_time
    );

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
            >
                <ThemeProvider>
                    <AuthProvider>
                        <EventsProvider events={events}>
                            <Navbar />
                            {children}
                        </EventsProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
