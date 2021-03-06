import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from 'react-query'
import Spinner from '../components/spinner'
import {getUpcomingMovies} from '../api/tmdb-api'
//import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import PlaylistAddIcon from '../components/cardIcons/addToPlaylist'

const UpcomingMoviesPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies) //change name of query to stop interference!

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const upcomingMovies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = upcomingMovies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={upcomingMovies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};

export default UpcomingMoviesPage;