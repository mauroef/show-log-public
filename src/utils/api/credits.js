import { handleResponse, handleFetchError } from '@/utils/helpers';
import { API } from '@/utils/constants';

const OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API.AUTH_KEY}`,
  },
};

export const getMovieCreditsById = async (id) => {
  const queryParams = '?language=en';

  try {
    const response = await fetch(`${API.BASE_URL}movie/${id}/credits${queryParams}`, OPTIONS);

    return await handleResponse(response).then((data) => data);
  } catch (error) {
    return handleFetchError(error, `movie credits id: ${id}`, null);
  }
};

export const getShowCreditsById = async (id) => {
  try {
    const response = await fetch(`${API.BASE_URL}tv/${id}/credits`, OPTIONS);

    return await handleResponse(response).then((data) => data);
  } catch (error) {
    return handleFetchError(error, `show credits id: ${id}`, null);
  }
};
