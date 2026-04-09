'use client';

import React from 'react';
import Image from 'next/image';

export const BirthdayHero = () => {
  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-[#f1d6df] px-4 py-12 sm:py-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cake-hero-bg.png"
          alt="Birthday Cakes Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f1d6df] via-[#f1d6df]/90 to-transparent" />
      </div>
      
      <div className="relative z-10 mx-auto flex max-w-7xl justify-center text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <h1 className="section-title text-4xl sm:text-5xl md:text-6xl text-[#5f4f58] leading-tight">
            Design Your Perfect Birthday Cake
          </h1>
          <p className="body-copy mt-4 max-w-2xl text-lg text-[#5f4f58]/80 sm:mt-6 sm:text-xl">
            Customize theme, flavor, size, and design in minutes. Make their special day unforgettable.
          </p>
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => {
                document.getElementById('birthday-builder')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary px-8 py-3 text-lg"
            >
              Start Customizing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
