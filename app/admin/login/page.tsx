'use client';

import { useActionState, useState } from 'react';
import { loginAction } from '@/app/admin/auth-actions';
import { SITE_NAME } from '@/theme';

export default function AdminLoginPage() {
    const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
        return await loginAction(formData) as any;
    }, null);

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex min-h-[100dvh] w-full overflow-x-hidden bg-[#fdfaf7] text-foreground font-sans">
            {/* Left Column: Visual Storytelling */}
            <div className="relative hidden w-1/2 flex-col justify-end overflow-hidden bg-gradient-to-br from-[#E8D9CE] to-[#F1E5DC] p-12 lg:flex xl:w-[55%]">
                {/* Decorative floating shapes */}
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-[100px]" />
                <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-gold/10 blur-[120px]" />
                
                {/* Background Image Wrapper (can swap for real cake photo) */}
                <div className="absolute inset-0 opacity-40 mix-blend-multiply">
                   <img 
                      src="/images/signature-cake.png" 
                      alt="Bakery Visual" 
                      className="absolute inset-0 h-full w-full object-cover object-bottom" 
                      style={{ filter: 'blur(3px) brightness(0.9)' }}
                   />
                </div>

                <div className="relative z-10 mb-10 max-w-xl text-white mix-blend-exclusion drop-shadow-lg">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-pulse"></span>
                        Secure Panel
                    </div>
                    <h1 className="font-serif text-5xl leading-tight tracking-tight sm:text-6xl text-white">
                        {SITE_NAME}
                        <br />
                        <span className="text-white/80">Command Center</span>
                    </h1>
                    <p className="mt-6 text-lg text-white/90 font-light leading-relaxed">
                        Manage your artisan catalog, track daily orders, and orchestrate custom cake milestones with precision and grace.
                    </p>
                </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="flex w-full items-center justify-center p-6 lg:w-1/2 xl:w-[45%] bg-[#FDFBF9] relative">
                {/* Mobile decorative background element */}
                <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px] lg:hidden" />
                
                <div className="w-full max-w-md relative z-10 animate-[slideUp_0.6s_cubic-bezier(0.16,1,0.3,1)]">
                    
                    {/* Security Badge & Form Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-brand-border/60 mb-5 text-2xl">
                            🎂
                        </div>
                        <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-text-soft">
                            Please sign in to access the administrator dashboard.
                        </p>
                    </div>

                    {/* The Glassmorphism Form Card */}
                    <div className="rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-[0_20px_40px_rgba(109,80,96,0.06)] backdrop-blur-xl sm:p-10 relative overflow-hidden">
                        
                        {/* Shimmer line at top of card */}
                        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                        <form action={formAction} className="space-y-5">
                            
                            {/* Email Input */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-text-soft ml-1">
                                    Email Address
                                </label>
                                <div className="group relative flex items-center">
                                    <div className="absolute left-4 z-10 text-text-soft/60 transition-colors group-focus-within:text-primary">
                                        ✉️
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="admin@arzishcakery.com"
                                        className="peer w-full rounded-2xl border border-brand-border/80 bg-white/60 py-3.5 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-all duration-300 focus:bg-white focus:border-primary/60 focus:ring-4 focus:ring-primary/10 focus:shadow-md placeholder:text-text-soft/40"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="mb-1.5 flex justify-between items-center text-xs font-semibold uppercase tracking-[0.1em] text-text-soft ml-1">
                                    <span>Passphrase</span>
                                    <a href="#" className="font-medium normal-case text-primary hover:text-primary-light hover:underline transition-all">
                                        Forgot?
                                    </a>
                                </label>
                                <div className="group relative flex items-center">
                                    <div className="absolute left-4 z-10 text-text-soft/60 transition-colors group-focus-within:text-primary">
                                        🔒
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        placeholder="••••••••••••"
                                        className="peer w-full rounded-2xl border border-brand-border/80 bg-white/60 py-3.5 pl-11 pr-12 text-sm font-medium tracking-wider text-foreground shadow-sm outline-none transition-all duration-300 focus:bg-white focus:border-primary/60 focus:ring-4 focus:ring-primary/10 focus:shadow-md placeholder:text-text-soft/40 placeholder:tracking-normal"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 p-2 text-text-soft/60 hover:text-foreground transition-colors z-10 outline-none rounded-full hover:bg-black/5"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="flex items-center pt-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input type="checkbox" className="peer sr-only" />
                                        <div className="h-5 w-5 rounded border border-brand-border bg-white transition-all peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50 shadow-sm"></div>
                                        <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 transition-opacity peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    <span className="text-sm font-medium text-text-soft group-hover:text-foreground transition-colors">
                                        Remember exactly who I am
                                    </span>
                                </label>
                            </div>

                            {state?.error ? (
                                <div className="rounded-xl border border-red-100 bg-red-50/50 p-3 text-center text-xs font-semibold text-red-600 animate-[pulse_0.4s_ease-out]">
                                    {state.error}
                                </div>
                            ) : null}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-[#8A677B] px-6 py-4 text-sm font-bold tracking-widest text-white shadow-[0_10px_20px_rgba(109,80,96,0.15)] transition-all duration-300 hover:shadow-[0_15px_30px_rgba(109,80,96,0.25)] hover:-translate-y-0.5 disabled:opacity-75 disabled:hover:translate-y-0 disabled:hover:shadow-none outline-none focus:ring-4 focus:ring-primary/30"
                                >
                                    <span className="relative z-10 uppercase inline-flex items-center gap-2">
                                        {isPending ? (
                                            <>
                                              <svg className="mx-auto h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                              Authenticating...
                                            </>
                                        ) : (
                                            'Authenticate'
                                        )}
                                    </span>
                                    {/* Hover gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 flex justify-center text-[11px] font-semibold uppercase tracking-[0.1em] text-text-soft/60">
                        <span className="flex items-center gap-1.5">
                            🛡️ SSL Encrypted Area · Arzish Cakery V1.5
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}


