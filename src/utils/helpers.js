import { IMAGE_URLS, SITE } from '@/utils/constants';
import slugify from 'slugify';

export const slug = (text) => slugify(text, { lower: true, strict: true });

export const extractIdFromSlug = (slug) => {
  const parts = slug.split('-');

  return parts[parts.length - 1];
};

export const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message || 'An error occurred');
  }
  return response.json();
};

export const handleFetchError = (error, context, fallback = null) => {
  console.error(`Error fetching ${context}:`, error);

  return fallback;
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  return formatter.format(date);
};

export const generateStructuredData = ({ type, data }) => {
  const generateActors = (cast) =>
    cast
      ? cast
          .filter((actor) => actor && actor.name)
          .map((actor) => ({
            '@type': 'Person',
            name: actor.name,
          }))
      : [];

  const generateCreators = (created_by) =>
    created_by?.map((creator) => ({
      '@type': 'Person',
      name: creator.name,
    }));

  const generateDirectors = (directors) =>
    directors
      ? directors
          .filter((director) => director && director.name)
          .map((director) => ({
            '@type': 'Person',
            name: director.name,
          }))
      : [];

  const generateGenres = (genres) =>
    genres
      ? genres.filter((genre) => genre && genre.name).map((genre) => genre.name)
      : [];

  const generateProductionCompanies = (production_companies) =>
    production_companies
      ? production_companies
          .filter((company) => company && company.name)
          .map((company) => {
            const productionCompanyItem = {
              '@type': 'Organization',
              name: company.name || '',
              location: {
                '@type': 'Country',
                name: company.origin_country || '',
              },
            };
            if (company.logo_path) {
              productionCompanyItem.image = `${IMAGE_URLS.BASE_COMPANY}${company.logo_path}`;
            }

            return productionCompanyItem;
          })
      : [];

  const generateAggregateRating = (vote_average, vote_count) => ({
    '@type': 'AggregateRating',
    ratingValue: vote_average ? (vote_average / 10) * 4 + 1 : 1,
    reviewCount: vote_count || 1,
  });

  switch (type) {
    case SITE.PAGE.HOME:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE.NAME,
        url: SITE.DOMAIN,
        description: 'Discover and explore movies and TV shows on ShowLog.',
        inLanguage: 'en',
      };

    case SITE.PAGE.SHOWS:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Best Streaming TV Shows - ShowLog',
        url: `${SITE.DOMAIN}/shows`,
      };

    case SITE.PAGE.MOVIES:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Best Streaming and Popular Movies - ShowLog',
        url: `${SITE.DOMAIN}/movies`,
      };

    case SITE.PAGE.SHOW_DETAILS:
      return {
        '@context': 'https://schema.org',
        '@type': 'TVSeries',
        actor: generateActors(data.cast),
        aggregateRating: generateAggregateRating(
          data.vote_average,
          data.vote_count
        ),
        creator: generateCreators(data.created_by),
        datePublished: data.first_air_date || '',
        description: data.overview || 'No description available.',
        genre: generateGenres(data.genres),
        image: `${IMAGE_URLS.BASE_LEAD}${data.poster_path}` || '',
        name: data.name || 'No name available.',
        numberOfSeasons: data.seasons.length || 0,
        productionCompany: generateProductionCompanies(
          data.production_companies
        ),
        url: `${SITE.DOMAIN}/shows/${data.slug}` || '',
      };

    case SITE.PAGE.MOVIE_DETAILS:
      return {
        '@context': 'https://schema.org',
        '@type': 'Movie',
        actor: generateActors(data.cast),
        aggregateRating: generateAggregateRating(
          data.vote_average,
          data.vote_count
        ),
        datePublished: data.release_date || '',
        description: data.overview || 'No description available.',
        director: generateDirectors(data.directors),
        genre: generateGenres(data.genres),
        image: `${IMAGE_URLS.BASE_LEAD}${data.poster_path}` || '',
        name: data.title || 'No name available.',
        production_companies: generateProductionCompanies(
          data.production_companies
        ),
        url: `${SITE.DOMAIN}/movies/${data.slug}` || '',
      };

    default:
      return null;
  }
};
