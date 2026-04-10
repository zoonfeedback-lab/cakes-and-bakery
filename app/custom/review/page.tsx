import type { Metadata } from 'next';
import { Footer, Header } from '@/components/layout';
import { ReviewPage } from '@/components/studio/ReviewPage';
import { getCatalogData } from '@/lib/catalog';
import { SITE_NAME } from '@/theme';

export const metadata: Metadata = {
  title: `Review Selection | ${SITE_NAME}`,
  description: 'Review your bespoke cake selection and proceed to secure checkout.',
};

export default async function BespokeReviewPage() {
  const catalog = await getCatalogData();

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFCFB]">
      <Header />
      <ReviewPage cakes={catalog.cakes} bakes={catalog.bakes} />
      <Footer />
    </div>
  );
}
