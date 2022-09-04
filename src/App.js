import './App.css';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies ] = useState([]);
  const [searchValue, setSearchValue ] = useState(' ');
  const [favourites, setFavourites] = useState([]);


//fetch data from API
const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=df17328e`;
  const response = await fetch(url);
  const responseJson = await response.json();

  //handle error because the searchValue was set to ' ' when page loads, and it coudlnt retrieve data from, so i added this if
  if(responseJson.Search){
    setMovies(responseJson.Search)
  }
 
}

useEffect(() => { 
  getMovieRequest(searchValue);
}, 
[searchValue]);

useEffect( () => {
  //retrieve the items saved in localstorage
  const movieFavourites = JSON.parse(
    localStorage.getItem('react-movie-app-favourites'));

  setFavourites(movieFavourites);
},[]);

//needed to be done this func because if we refresh all data from Favourites Movies disappear
const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
}

const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie]; //copy of the current array and save it into state
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList)
}

const removeFavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter ((favourite) => favourite.imdbID !== movie.imdbID);
  setFavourites(newFavouriteList);
  saveToLocalStorage(newFavouriteList)
}
  return (
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4 '>
      <MovieListHeading heading="Movies"/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className='row'>
      <MovieList movies = {movies} handleFavouriteClick={addFavouriteMovie} favouriteComponent={AddFavourites}/>
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4 '>
      <MovieListHeading heading="Favourites"/>
    </div>
    <div className='row'>
      <MovieList movies = {favourites} handleFavouriteClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} />
    </div>
  </div>
  )
}

export default App;
