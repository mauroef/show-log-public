import { API } from '@/utils/constants';
import { handleResponse, handleFetchError } from '@/utils/helpers';

const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API.AUTH_KEY}`,
  },
};

export const getMostVotedShows = async () => {
  const queryParams =
    '?include_adult=false&include_video=true&language=en-US&page=1&sort_by=vote_count.desc';

  try {
    const response = await fetch(
      `${API.BASE_URL}discover/tv${queryParams}`,
      OPTIONS
    );

    return await handleResponse(response).then((data) => data.results);
  } catch (error) {
    return handleFetchError(error, 'most voted shows', []);
  }
};

export const getPopularShows = async () => {
  const queryParams = '?language=en-US&page=1';

  try {
    const response = await fetch(
      `${API.BASE_URL}tv/popular${queryParams}`,
      OPTIONS
    );

    return await handleResponse(response).then((data) => data.results);
  } catch (error) {
    return handleFetchError(error, 'popular shows', []);
  }
};

export const getSeasonsChapters = async (showId, seasonNumber) => {
  const queryParams = '?language=en-US';

  try {
    const response = await fetch(
      `${API.BASE_URL}/tv/${showId}/season/${seasonNumber}${queryParams}`,
      OPTIONS
    );

    return await handleResponse(response).then((data) => data.episodes);
  } catch (error) {
    return handleFetchError(error, 'season chapters', []);
  }
};

export const getShowById = async (id, { withCredits = false } = {}) => {
  const queryParams = `?language=en-US${
    withCredits ? '&append_to_response=credits' : ''
  }`;

  try {
    const response = await fetch(
      `${API.BASE_URL}tv/${id}${queryParams}`,
      OPTIONS
    );

    return await handleResponse(response).then((data) => data);
  } catch (error) {
    return handleFetchError(error, `show details id: ${id}`, null);
  }
};

export const getShowsByProvider = async (providerId) => {
  const queryParams = `?with_watch_providers=${providerId}&watch_region=AR`;

  try {
    const response = await fetch(
      `${API.BASE_URL}discover/tv${queryParams}`,
      OPTIONS
    );

    return await handleResponse(response).then((data) => data.results);
  } catch (error) {
    return handleFetchError(error, `show video id: ${id}`, null);
  }
};

export const getShowVideosById = async (id) => {
  try {
    const response = await fetch(`${API.BASE_URL}tv/${id}/videos`, OPTIONS);

    return await handleResponse(response).then((data) => data.results);
  } catch (error) {
    return handleFetchError(error, `show video id: ${id}`, null);
  }
};
