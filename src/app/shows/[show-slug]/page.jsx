import { notFound } from 'next/navigation';
import { getShowById, getShowCreditsById } from '@/utils/api';
import { generateStructuredData, extractIdFromSlug } from '@/utils/helpers';
import { SITE } from '@/utils/constants';
import {
  Cast,
  DetailHeader,
  DetailBody,
  Divider,
  MainLayout,
  ShowSeasons,
} from '@/components/';
import { transformCastData, withTitle } from '@/utils/dataTransformation';

export async function generateMetadata({ params }) {
  const id = extractIdFromSlug(params['show-slug']);
  const show = await getShowById(id);

  return {
    title: `${show.name} - ShowLog`,
    description: show.overview || 'Track Your Favorite Shows and Movies.',
  };
}

const ShowDetailsPage = async ({ params }) => {
  const slug = params['show-slug'];
  const id = extractIdFromSlug(slug);
  const show = await getShowById(id, { withCredits: true });

  if (!show) {
    notFound();
  }

  const credits = show.credits;
  const cast = transformCastData(credits.cast);

  const seasons = await withTitle(show.seasons);

  const structuredData = generateStructuredData({
    type: SITE.PAGE.SHOW_DETAILS,
    data: { ...show, slug, cast },
  });

  return (
    <MainLayout>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DetailHeader
        average={Math.trunc(show.vote_average * 10)}
        landscape={show.backdrop_path}
        subheadline={show.tagline}
        portrait={show.poster_path}
        headline={show.name}
      />
      <DetailBody overview={show.overview} />
      <Divider />
      <ShowSeasons data={seasons} showId={id} />
      <Divider />
      <Cast data={cast} />
      <Divider />
    </MainLayout>
  );
};

export default ShowDetailsPage;
