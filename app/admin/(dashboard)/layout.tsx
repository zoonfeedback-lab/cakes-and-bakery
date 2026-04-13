import type { Metadata } from 'next';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
    title: `Premium Dashboard | ${SITE_NAME}`,
    description: 'Manage your high-end artisan catalog and orders efficiently.',
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
