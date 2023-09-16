import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const Form = ({searchMovies}) => {
	const [searchQuery, setSearchQuery] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		searchMovies(searchQuery)
	};
	return (
		<form action='' onSubmit={handleSubmit} className='rounded-lg w-full'>
			<div className='flex items-center w-full rounded-lg'>
				<input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='What do you want to watch? ' className='text-black px-4 py-2 w-full md:w-[500px] rounded-lg border focus:outline-none focus:ring focus:border-blue-300  bg-none' />
				<button type='submit' className='absolute inset-y-0 right-0 flex  items-center pr-3'>
					<BsSearch size={17} />
				</button>
			</div>
		</form>
	);
};

export default Form;
