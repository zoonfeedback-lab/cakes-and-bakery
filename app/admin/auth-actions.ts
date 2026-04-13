'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const actualEmail = process.env.ADMIN_EMAIL;
    const actualPassword = process.env.ADMIN_PASSWORD;

    if (!actualPassword || !actualEmail) {
        return { error: 'Admin credentials not properly configured on server.' };
    }

    if (email !== actualEmail || password !== actualPassword) {
        return { error: 'Incorrect email or password' };
    }

    const cookieStore = await cookies();
    cookieStore.set({
        name: 'admin_session',
        value: 'authenticated_admin',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    redirect('/admin');
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}
