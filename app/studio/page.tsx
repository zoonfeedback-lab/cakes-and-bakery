import type { Metadata } from 'next';
import { Footer, Header } from '@/components/layout';
import { StudioPage } from '@/components/studio/StudioPage';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
  title: `Custom Studio - ${SITE_NAME}`,
  description: 'Design your own masterpiece in our Custom Studio.',
};

export default function CustomStudioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCFB]">
      <Header />
      <StudioPage />
      <Footer />
    </div>
  );
}
