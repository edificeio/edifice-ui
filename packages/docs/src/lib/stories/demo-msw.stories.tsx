import { http, HttpResponse, delay } from 'msw';
import { useState, useEffect } from 'react';

function FilmCard({ film }: { film: any }) {
  return (
    <article className="film-card">
      <h4 className="film-title">{film.title}</h4>
      <p>{film.opening_crawl}</p>
    </article>
  );
}

function useFetchFilms() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
    setStatus('loading');

    fetch('/films')
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        setStatus('success');
        setData(data.results);
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  return {
    status,
    data,
  };
}

export function App() {
  const { status, data: films } = useFetchFilms();

  if (status === 'loading') {
    return <p>Fetching Star Wars data...</p>;
  }

  if (status === 'error') {
    return <p>Could not fetch Star Wars data</p>;
  }

  return (
    <div className="films-grid">
      {films.map((film) => (
        // @ts-ignore
        <FilmCard key={film.episode_id} film={film} />
      ))}
    </div>
  );
}

const meta = {
  title: 'Demos/Fetch',
  component: App,
};

export default meta;

export const DefaultBehavior = {};

const films = [
  {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: `(Mocked) Rebel spaceships have won their first victory against the evil Galactic Empire.`,
  },
  {
    title: 'Empire Strikes Back',
    episode_id: 5,
    opening_crawl: `(Mocked) Imperial troops are pursuing the Rebel forces across the galaxy.`,
  },
  {
    title: 'Return of the Jedi',
    episode_id: 6,
    opening_crawl: `(Mocked) Luke Skywalker has returned to his home planet of Tatooine to rescue Han Solo.`,
  },
];

export const MockedSuccess = {
  parameters: {
    msw: {
      handlers: [
        http.get('/films', () => {
          return HttpResponse.json({
            results: films,
          });
        }),
      ],
    },
  },
};

export const MockedError = {
  parameters: {
    msw: {
      handlers: [
        http.get('/films', async () => {
          await delay(300);
          return new HttpResponse(null, {
            status: 403,
          });
        }),
      ],
    },
  },
};
