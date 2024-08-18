import { SITE } from '@/utils/constants';
import { generateStructuredData } from '@/utils/helpers';
import {
  Divider,
  MainLayout,
  MostVotedMovies,
  MostVotedShows,
  UpcomingMovies,
} from '@/components/';

const HomePage = () => {
  const structuredData = generateStructuredData({ type: SITE.PAGE.HOME });

  return (
    <MainLayout>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <UpcomingMovies />
      <MostVotedMovies />
      <Divider />
      <MostVotedShows />
    </MainLayout>
  );
};

export default HomePage;
