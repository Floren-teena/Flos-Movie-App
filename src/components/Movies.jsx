import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';

const Movies = ({allMovies}) => {
	const [movies, setMovies] = useState([]);
	const [isMore, setIsMore] = useState(false);
    const searchQuery = ""
    useEffect(() => {
		allMovies.forEach((item)=>{
			item.isLiked=false 
		})
		setMovies(allMovies.slice(0, 10));
	}, [allMovies]);

	const handleMore = () => {
		
		setIsMore(true);
	};

	const handleLess = () => {
		setMovies(allMovies.slice(0, 10));
		setIsMore(false);
	};

	const handleLike = (id) => {
		const newMovies = movies.map((movie)=>{
			if (movie.id === id) {
				movie.vote_count = movie.isLiked ? movie.vote_count - 1 : movie.vote_count + 1;
				movie.isLiked = !movie.isLiked;
				return movie
			}
			return movie
		})
		console.log(newMovies)
		setMovies(newMovies)
	};
	console.log(movies);
	return (
		<section className='py-8 px-3'>
			<div className='container mx-auto'>
				<div className='flex justify-between font-semibold'>
					<h2 className='text-xl md:text-2xl px-2 lg:text-[36px] capitalize font-bold '>{searchQuery ? searchQuery : 'Movies'} Movies</h2>
					{!isMore ? (
						<button className='text-[#BE123C] flex items-center ' onClick={handleMore}>
							See more <MdOutlineKeyboardArrowRight size={25} />
						</button>
					) : (
						<button disabled={movies.length < 1} className='text-[#BE123C] flex items-center ' onClick={handleLess}>
							Show Less <MdOutlineKeyboardArrowLeft size={25} />
						</button>
					)}
				</div>
				<>
					{movies.length < 1 ? (
						<h1 className='text-red-400 w-full h-[200px] flex justify-center items-center text-center text-2xl font-semibold'>No movies found! {searchQuery}, Kindly try another movie</h1>
					) : (
						<div className='gap-y-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 py-8'>
							{movies?.map((movie) => (
								<div data-testid='movie-card' key={movie?.id} className='bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-in-out relative'>
									<button type='button' onClick={() => handleLike(movie?.id)} className='absolute z-[10000000] top-8 right-8 bg-gray-300 rounded-full p-1'>
										{movie?.isLiked ? <AiTwotoneHeart size={25} color='#BE123C' /> : <AiOutlineHeart size={25} />}
									</button>
									<Link href={`/movies/${movie?.id}`}>
										<div className='relative'>
											<img data-testid='movie-poster' src={movie?.poster_path ? `https://image.tmdb.org/t/p/original${movie?.poster_path}` : '/assets/images/default.jpg'} alt={movie?.title} className='w-full h-[350px] mb-2' />
										</div>
										<section className='flex flex-col gap-2'>
											<p className='text-[#9CA3AF] text-[12px] font-bold uppercase' data-testid='movie-title'>
												{movie?.original_language}, <span data-testid='movie-release-date'>{movie?.release_date ? new Date(movie?.release_date).toUTCString() : 'No release date'}</span>
											</p>
											<h3 data-testid='movie-title' className='text-lg font-bold text-[#111827] text-[18px] leading-[101%]'>
												{movie?.title}
											</h3>
											<div className='flex justify-between text-sm h-8 text-[#111827] font-normal'>
												<div className='flex items-center gap-2'>
													<Image src='/assets/images/imdb.svg' alt={movie?.title} width={10} height={10} layout='intrisic' className='w-auto h-6' />
													<p>{movie?.vote_average}</p>
												</div>
												<div className='flex items-center gap-2'>
													<Image src='/assets/images/fruit.png' alt={movie?.title} layout='intrisic' height={50} width={50} className='w-6 h-6' />
													<p>{movie.vote_count}</p>
												</div>
											</div>
										</section>
									</Link>
								</div>
							))}
						</div>
					)}
				</>
			</div>
		</section>
	);
};

export default Movies;
