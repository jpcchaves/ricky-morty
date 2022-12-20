import { useState, useEffect } from 'react';
import { Caracter } from '../types/Caracter';
import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api';

export const useAxiosFetch = (params: AxiosRequestConfig<any>) => {
	const [data, setData] = useState<Caracter[] | undefined>([]);
	const [error, setError] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchData = async (): Promise<void> => {
		try {
			const response = await axios.request(params);
			setData(response.data.results);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError('Axios Error with Message: ' + error.message);
			} else {
				setError(error);
			}

			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return [data, error, isLoading, fetchData] as const;
};
