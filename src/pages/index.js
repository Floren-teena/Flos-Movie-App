import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Movies from '@/components/Movies';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';
import Error from 'next/error';
const token = process.env.NEXT_PUBLIC_MOVIESDB_API_KEY;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const api_key = process.env.NEXT_PUBLIC_MOVIESDB_API_KEY;
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("")
  const [moviesLoading, setMoviesLoading] = useState(false)
  const [featuredMovie, setFeaturedMovie] = useState({})
   const fetchMovies = async () => {
    setMoviesLoading(true)
    try {
      const response = await axios.get(`${baseUrl}/movie/popular?api_key=${api_key}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        contentType: 'application/json',
      });
      if (response.error) {
        throw new Error("An error occured while fetching data") 
      }
      const {data} = response
      console.log(data.results);
      setMovies(data.results)
      setFeaturedMovie(data.results[0])
      setMoviesLoading(false)
    } catch (error) {
      setMoviesLoading(false)
      setError(error.message)
    }
  };
  useEffect(() => {
    fetchMovies();
}, []);
  console.log(moviesLoading)
	return (
		<main>
			<section className='mb-8 w-full bg-blend-color h-[80vh] flex flex-col justify-center items-center' style={{ backgroundImage: `url(${featuredMovie?.poster_path ? `https://image.tmdb.org/t/p/original${featuredMovie?.poster_path}` : '/assets/images/default.jpg'})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor: 'rgba(0,0,0,0.6)' }}>
				<Navbar />
        {moviesLoading?<section className='bg-gray-50 w-full h-screen flex justify-center items-center'>
				<ColorRing visible={true} height='80' width='80' ariaLabel='blocks-loading' wrapperStyle={{}} wrapperClass='blocks-wrapper' colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
			</section>:
				<SplashScreen featuredMovie={featuredMovie}/>
      }
			</section>
			<Movies allMovies={movies} />
			<Footer />
		</main>
	);
}