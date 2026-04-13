import type { Metadata } from 'next';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
    title: `Premium Dashboard | ${SITE_NAME}`,
    description: 'Manage your high-end artisan catalog and orders efficiently.',
};

import { SearchProvider } from '@/context/SearchContext';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SearchProvider>
            <AdminLayoutClient>{children}</AdminLayoutClient>
        </SearchProvider>
    );
}
