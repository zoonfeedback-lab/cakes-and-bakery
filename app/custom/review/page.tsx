import type { Metadata } from 'next';
import { Footer, Header } from '@/components/layout';
import { ReviewPage } from '@/components/studio/ReviewPage';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
  title: `Review Selection | ${SITE_NAME}`,
  description: 'Review your bespoke cake selection and proceed to secure checkout.',
};

export default function BespokeReviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCFB]">
      <Header />
      <ReviewPage />
      <Footer />
    </div>
  );
}
