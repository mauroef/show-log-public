import { SITE } from '@/utils/constants';
import { generateStructuredData } from '@/utils/helpers';
import {
  AmazonPrimeVideoShows,
  AppleTvPlusShows,
  CrunchyrollShows,
  DisneyPlusShows,
  Divider,
  MainLayout,
  MaxShows,
  NetflixShows,
  ParamountPlusShows,
  PopularShows,
} from '@/components';

export async function generateMetadata() {
  return {
    title: `TV Shows - ShowLog`,
    description: 'Discover the best TV shows across different streaming platforms. Explore top-rated content and find your next favorite series.',
  };
}

const ShowsPage = () => {
  const structuredData = generateStructuredData({ type: SITE.PAGE.SHOWS });

  return (
    <MainLayout>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PopularShows />
      <NetflixShows />
      <Divider />
      <AmazonPrimeVideoShows />
      <Divider />
      <MaxShows />
      <Divider />
      <DisneyPlusShows />
      <Divider />
      <AppleTvPlusShows />
      <Divider />
      <ParamountPlusShows />
      <Divider />
      <CrunchyrollShows />
    </MainLayout>
  );
};

export default ShowsPage;
