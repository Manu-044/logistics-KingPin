import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import AICopilot from '@/components/Dashboard/AICopilot';

export const metadata: Metadata = {
  title: 'Kingpin Logistics — Intelligent Logistics Management',
  description: 'End-to-end logistics management: real-time tracking, shipment management, route simulation, and analytics — all in one premium platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <AICopilot />
        </Providers>
      </body>
    </html>
  );
}
