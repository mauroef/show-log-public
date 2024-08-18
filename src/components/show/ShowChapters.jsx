import Image from 'next/image';
import { IMAGE_URLS } from '@/utils/constants';
import { formatDate } from '@/utils/helpers';

const ShowChapters = ({ data }) => {
  return (
    <ul className='flex flex-col gap-4'>
      {data.map((season) => (
        <li key={season.id}>
          <article className='p-3 bg-neutral-600 rounded-xl flex gap-3'>
            <header className='min-w-[140px] max-w-[140px] md:min-w-[180px] md:max-w-[180px] lg:min-w-[220px] lg:max-w-[220px]'>
              <Image
                alt={season.name}
                className={`aspect-[16/9] rounded-lg shadow-xl ${season.still_path ? '' : 'invisible'}`}
                height={141}
                width={250}
                src={`${IMAGE_URLS.BASE_LEAD}${season.still_path}`}
              />
            </header>
            <main className='flex flex-col justify-center'>
              {season.name && (
                <p className='line-clamp-1 text-sm font-semibold/70 line-clamp-1 md:text-lg'>
                  {season.episode_number}. {season.name}
                </p>
              )}
              {season.air_date && (
                <p className='text-xs text-white/70 uppercase font-bold line-clamp-1 md:text-sm'>
                  {formatDate(season.air_date)}
                </p>
              )}
              {season.overview && (
                <p className='mt-1 text-xs font-light/70 line-clamp-2 overflow-y-auto break-all md:break-normal md:text-sm xl:text-base xl:line-clamp-3'>
                  {season.overview}
                </p>
              )}
            </main>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default ShowChapters;
