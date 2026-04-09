import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { BirthdayHero } from '@/components/birthday/BirthdayHero';
import { BirthdayApp } from '@/components/birthday/BirthdayApp';
import { BirthdayProvider } from '@/components/birthday/BirthdayContext';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
  title: `Design Birthday Cake - ${SITE_NAME}`,
  description: 'Design your perfect birthday cake with our realistic live customizer. Choose theme, flavor, size, and decorations.',
};

export default function BirthdayPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface overflow-x-hidden">
      <Header />
      
      <main className="flex flex-1 flex-col pb-20">
        <BirthdayHero />
        
        <div id="birthday-builder">
          <BirthdayProvider>
            <BirthdayApp />
          </BirthdayProvider>
        </div>
      </main>

      <Footer />
    </div>
  );
}
