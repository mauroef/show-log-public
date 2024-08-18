import { SITE } from '@/utils/constants';
import { generateStructuredData } from '@/utils/helpers';
import {
  NetflixMovies,
  MainLayout,
  PopularMovies,
  Divider,
  AmazonPrimeVideoMovies,
  AppleTvPlusMovies,
  DisneyPlusMovies,
  ParamountPlusMovies,
  MaxMovies,
  CrunchyrollMovies,
} from '@/components/';

export async function generateMetadata() {
  return {
    title: `Movies - ShowLog`,
    description: 'Discover the best movies across different streaming platforms. Explore top-rated content and find your next favorite movie.',
  };
}

const MoviesPage = () => {
  const structuredData = generateStructuredData({ type: SITE.PAGE.SHOWS });

  return (
    <MainLayout>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PopularMovies />
      <NetflixMovies />
      <Divider />
      <AmazonPrimeVideoMovies />
      <Divider />
      <MaxMovies />
      <Divider />
      <DisneyPlusMovies />
      <Divider />
      <AppleTvPlusMovies />
      <Divider />
      <ParamountPlusMovies />
      <Divider />
      <CrunchyrollMovies />
    </MainLayout>
  );
};

export default MoviesPage;
