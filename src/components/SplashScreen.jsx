import Image from 'next/image';
import React from 'react';

const SplashScreen = ({featuredMovie}) => {
	return (
		<section className='text-white w-full  flex px-4 justify-center items-center'>
			<div className='container mx-auto md:mx-16'>
				<div className='flex gap-4 w-full md:w-[60%] lg:w-[40%] justify-between flex-col font-semibold'>
					<h1 className='font-bold text-4xl md:text-5xl'>{featuredMovie?.title}</h1>
					<div className='flex gap-8 text-sm h-8 text-white font-normal'>
						<div className='flex items-center gap-2'>
							<Image src='/assets/images/imdb.svg' alt={featuredMovie?.title} width={10} height={10} layout='intrisic' className='w-auto h-6' />
							<p>{(featuredMovie?.vote_average * 10).toFixed(1)} / 100</p>
						</div>
						<div className='flex items-center gap-2 text-white'>
							<Image src='/assets/images/fruit.png' alt={featuredMovie?.title} layout='intrisic' height={50} width={50} className='w-6 h-6' />
							<p>{featuredMovie?.vote_count}</p>
						</div>
					</div>
					<p className='w-full md:w-[80%]'>{featuredMovie?.overview}</p>
					<button className='bg-[#BE123C] flex items-center justify-center rounded-lg py-4 px-6 gap-4 w-full md:w-[80%] lg:w-[50%]'>
						<Image src='/assets/images/trailer.svg' alt='trailer' layout='intrisic' height={10} width={10} className='w-6 h-6' />
						Watch Trailer
					</button>
				</div>
			</div>
		</section>
	);
};

export default SplashScreen;
