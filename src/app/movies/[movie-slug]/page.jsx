import { notFound } from 'next/navigation';
import { SITE } from '@/utils/constants';
import { getMovieById } from '@/utils/api';
import { extractIdFromSlug, generateStructuredData } from '@/utils/helpers';
import {
  Cast,
  DetailBody,
  DetailHeader,
  Divider,
  MainLayout,
  SimilarMovies,
} from '@/components';
import {
  transformCastData,
  transformDirectorsData,
} from '@/utils/dataTransformation';

export async function generateMetadata({ params }) {
  const id = extractIdFromSlug(params['movie-slug']);
  const movie = await getMovieById(id);

  return {
    title: `${movie.title} - ShowLog`,
    description: movie.overview || 'Track Your Favorite Shows and Movies.',
  };
}

const MovieDetailsPage = async ({ params }) => {
  const slug = params['movie-slug'];
  const id = extractIdFromSlug(slug);
  const movie = await getMovieById(id, { withCredits: true });

  if (!movie) {
    notFound();
  }

  const credits = movie.credits;
  const cast = transformCastData(credits.cast);
  const directors = transformDirectorsData(credits.crew);

  const structuredData = generateStructuredData({
    type: SITE.PAGE.MOVIE_DETAILS,
    data: { ...movie, slug, cast, directors },
  });

  return (
    <MainLayout>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DetailHeader
        average={Math.trunc(movie.vote_average * 10)}
        landscape={movie.backdrop_path}
        subheadline={movie.tagline}
        portrait={movie.poster_path}
        headline={movie.title}
      />
      <DetailBody overview={movie.overview} />
      <Divider />
      <SimilarMovies id={id} />
      <Divider />
      <Cast data={cast} />
    </MainLayout>
  );
};

export default MovieDetailsPage;
