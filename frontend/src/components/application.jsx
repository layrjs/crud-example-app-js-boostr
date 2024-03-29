import {provide} from '@layr/component';
import {Routable} from '@layr/routable';
import React, {useMemo} from 'react';
import {layout, page, useData, useAction} from '@layr/react-integration';

import {extendMovie} from './movie';

export const extendApplication = (Base) => {
  class Application extends Routable(Base) {
    @provide() static Movie = extendMovie(Base.Movie);

    @layout('/') static MainLayout({children}) {
      return (
        <>
          <this.HomePage.Link>
            <h1>{process.env.APPLICATION_NAME}</h1>
          </this.HomePage.Link>

          {children()}
        </>
      );
    }

    @page('[/]') static HomePage() {
      return useData(
        async () =>
          await this.Movie.find(
            {},
            {title: true, year: true},
            {sort: {year: 'desc', title: 'asc'}}
          ),

        (movies) => (
          <>
            <h2>Movies</h2>

            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <movie.ItemPage.Link>{movie.title}</movie.ItemPage.Link>
                  {movie.year !== undefined ? ` (${movie.year})` : ''}
                </li>
              ))}
            </ul>

            <p>
              <button
                onClick={() => {
                  this.AddMoviePage.navigate();
                }}
              >
                New
              </button>
            </p>
          </>
        )
      );
    }

    @page('[/]movies/add') static AddMoviePage() {
      const movie = useMemo(() => new this.Movie(), []);

      const save = useAction(async () => {
        await movie.save();
        this.HomePage.navigate();
      });

      return (
        <>
          <h2>Add movie</h2>

          <movie.Form onSubmit={save} />

          <p>
            ‹ <this.HomePage.Link>Back</this.HomePage.Link>
          </p>
        </>
      );
    }

    @page('[/]*') static NotFoundPage() {
      return (
        <>
          <h2>Route not found</h2>

          <p>Sorry, there is nothing here.</p>
        </>
      );
    }
  }

  return Application;
};
