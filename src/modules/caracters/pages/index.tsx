import { useEffect, useState } from 'react';
import CaractersView from './view';
import { Caracter } from '../../../types/Caracter';
import { useAxiosFetch } from '../../../hooks/useAxiosFetch';
import axios from 'axios';
import { handleChangeDocTitle } from '../../../util/handleChangeDocTitle';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { KEYS_CONSTANTS } from '../../../constant/KeysContants';

const CaractersPage = () => {
	const [caracters, setCaracters] = useState<Caracter[] | undefined>([]);
	const [filteredData, setFilteredData] = useState<Caracter[] | undefined>(
		undefined
	);
	const [searchWord, setSearchWord] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [singleCaracter, setSingleCaracter] = useState<Caracter | null>(null);
	const [loadingCaracter, setLoadingCaracter] = useState(true);

	const [data, error, isLoading, fetchData] = useAxiosFetch({
		method: 'GET',
		url: '/character',
	});

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (data) {
			setCaracters(data);
		} else {
			setCaracters([]);
		}
	}, [data]);

	useEffect(() => {
		if (error) {
			console.log(error);
		}
	}, [error]);

	const handleEscapeKeydown = (e: { key: string }) => {
		if (e.key === KEYS_CONSTANTS.ESCAPE_KEY) {
			handleCloseModal();
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleEscapeKeydown);

		return () => document.removeEventListener('keydown', handleEscapeKeydown);
	}, []);

	const handleInputChange = (caracter: string) => {
		if (caracter === '') {
			setSearchWord('');
			setFilteredData(undefined!);
			return;
		}

		setSearchWord(caracter);

		const filteredWord = caracters?.filter((caracter) => {
			return caracter.name.toLowerCase().includes(searchWord.toLowerCase());
		});

		setFilteredData(filteredWord);
	};

	const handleCleanupInput = () => {
		setSearchWord('');
		setFilteredData(undefined!);
	};

	const handleOpenModal = async ({ id, name }: Caracter) => {
		handleChangeDocTitle(`Caracter: ${name}`);
		disableBodyScroll(document.body);

		try {
			setIsModalOpen(true);
			const data = await axios.get(`/character/${id}`);
			setLoadingCaracter(false);
			setSingleCaracter(data.data);
		} catch (error) {
			setLoadingCaracter(false);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSingleCaracter(null);
		enableBodyScroll(document.body);
		handleChangeDocTitle('Rick and Morty');
	};

	return (
		<CaractersView
			caracters={caracters}
			searchWord={searchWord}
			filteredData={filteredData}
			handleCleanupInput={handleCleanupInput}
			handleInputChange={handleInputChange}
			isLoading={isLoading}
			handleOpenModal={handleOpenModal}
			isModalOpen={isModalOpen}
			singleCaracter={singleCaracter}
			handleCloseModal={handleCloseModal}
			loadingCaracter={loadingCaracter}
		/>
	);
};

export default CaractersPage;
