import { useEffect, useState } from 'react';
import CaractersView from './view';
import { Caracter } from '../../../types/Caracter';
import { useAxiosFetch } from '../../../hooks/useAxiosFetch';
import axios from 'axios';
import { handleChangeDocTitle } from '../../../util/handleChangeDocTitle';

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

	const handleChangeTitle = async ({ id, name }: Caracter) => {
		handleChangeDocTitle(`Caracter: ${name}`);
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
			handleChangeTitle={handleChangeTitle}
			isModalOpen={isModalOpen}
			singleCaracter={singleCaracter}
			handleCloseModal={handleCloseModal}
			loadingCaracter={loadingCaracter}
		/>
	);
};

export default CaractersPage;
