import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai';
import Form from './Form';

const Navbar = ({searchMovies, searchQuery, setSearchQuery}) => {
	const [height, setHeight] = useState(0);
	const [openForm, setOpenForm] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setHeight(window.scrollY);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [height]);

	const handleMenu = () => {
		setOpenForm(!openForm);
	};

	return (
		<nav className={`px-4 md:px-8 py-3 z-[999999999] shadow-md transition-all duration-300 ease-in-out fixed top-0 left-0 w-full ${height >= 150 ? 'bg-white' : 'bg-none'}`}>
			<section className='relative'>
				<div className='container mx-auto flex justify-between items-center'>
					<div className='text-white text-2xl font-bold'>
						<Link href='/'>
							<div className='md:p-2 text-xl flex items-center gap-3 font-bold'>
								<Image src='/assets/images/logo.svg' layout='intrisic' height={25} width={25} />
								<h1 className={`${height >= 150 ? 'text-[#333]' : 'text-white'} text-[20px] font-bold`}>Flos Movies</h1>
							</div>
						</Link>
					</div>
					<div className='md:flex space-x-4 hidden  rounded-lg'>
						<div className='relative  rounded-lg'>
							<Form searchMovies={searchMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
							<div className='absolute inset-y-0 right-0 flex items-center pr-3'>{/* Search icon (optional) */}</div>
						</div>
					</div>

					<div className={`${height >= 150 ? 'text-[#333]' : 'text-white'}`}>
						{/* <Link href='/signin' className='font-semibold hidden md:flex'>
							Sign In
						</Link> */}
						<button onClick={handleMenu} type='button' className='flex md:hidden bg-[#BE123C] p-1 text-white rounded-full'>
							{openForm ? <AiOutlineClose size={20} /> : <AiOutlineMenuUnfold size={20} />}
						</button>
					</div>
				</div>
				{openForm && (
					<section className='absolute left-0 transition-all duration-300 ease-linear mt-8 w-[350px] flex justify-center '>
						<Form searchMovies={searchMovies} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
					</section>
				)}
			</section>
		</nav>
	);
};

export default Navbar;
