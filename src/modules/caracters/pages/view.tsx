import { BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import LoadingToast from '../../../components/LoadingToast';
import { Caracter } from '../../../types/Caracter';

import logo from '../../../assets/logo.png';

interface CaractersViewI {
	caracters: Caracter[] | undefined;
	searchWord: string;
	handleInputChange: (e: string) => void;
	handleCleanupInput: () => void;
	filteredData: Caracter[] | undefined;
	isLoading: boolean;
	handleDeleteCaracter: (id: number) => void;
	handleChangeTitle: (caracterName: string) => void;
}

const CaractersView = ({
	caracters,
	searchWord,
	handleInputChange,
	handleCleanupInput,
	filteredData,
	isLoading,
	handleDeleteCaracter,
	handleChangeTitle,
}: CaractersViewI) => {
	return (
		<div className="w-full h-full pb-40">
			<div className="flex flex-col gap-2 w-full mb-8">
				<div className="w-full flex justify-center items-center">
					<div className="w-[300px] py-6">
						<img src={logo} alt="logotipo do rick and morty" />
					</div>
				</div>

				<div className="flex flex-row justify-center items-center gap-8 ">
					<div className="sm:w-[90%] md:w-[70%] lg:w-[60%]">
						<div className="flex space-x-4">
							<div className="flex rounded-md overflow-hidden w-full">
								<input
									type="text"
									name="caracter"
									className="w-full focus:outline-none"
									placeholder="Digite um nome de personagem..."
									value={searchWord}
									onChange={(e) => handleInputChange(e.target.value)}
								/>
								{searchWord.length ? (
									<button
										onClick={handleCleanupInput}
										className="bg-white px-6 text-lg font-semibold py-4 rounded-md"
									>
										<AiOutlineClose />
									</button>
								) : (
									<span
										className="bg-white text-black px-6 text-2xl font-semibold py-4 rounded-r-md cursor-pointer flex justify-center items-center
								"
									>
										<BiSearchAlt2 />
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex w-full m-auto items-center justify-center gap-2 flex-wrap">
				<div className="flex w-[98%] flex-col items-center justify-center">
					{isLoading && <LoadingToast />}

					<div className="flex m-auto flex-wrap flex-row gap-8 items-center justify-center">
						{!isLoading && caracters?.length === 0 ? (
							<p>Não há personagens para</p>
						) : null}
						{(filteredData! || caracters).map((caracter: Caracter) => (
							<div
								key={caracter.id}
								className="w-[400px] bg-stone-100 flex flex-col justify-center border-solid border-2 border-gray-300 p-6 rounded-xl hover:scale-105 duration-200 ease-in shadow-lg shadow-gray-300 cursor-pointer"
								onClick={() => handleChangeTitle(caracter.name)}
							>
								<h2 className="text-2xl text-center mb-4">{caracter.name}</h2>
								<div className="m-auto rounded-full mb-4">
									<img
										className="object-cover rounded-full"
										src={caracter.image}
										alt="foto do personagem"
									/>
								</div>
								<p className="pt-2">
									<strong>Situação: </strong>
									{caracter.status === 'Alive' && 'Vivo'}
									{caracter.status === 'Dead' && 'Morto'}
									{caracter.status === 'unknown' && 'Só deus sabe'}
								</p>
								<p className="pt-2">
									<strong>Espécie:</strong>{' '}
									{caracter.species === 'Human' && 'Humano'}
									{caracter.species === 'Alien' && 'Alienígena'}
								</p>
								<p className="pt-2">
									<strong>Gênero: </strong>
									{caracter.gender === 'Male' && 'Masculino'}
									{caracter.gender === 'Female' && 'Feminino'}
								</p>
								<p className="py-2">
									<strong>Localização: </strong>
									{caracter.location.name}
								</p>
								<button
									className="bg-red-600 py-2 px-4 rounded text-white w-[50%] m-auto mt-6 hover:bg-red-500 hover:text-black duration-150 ease-in"
									onClick={() => handleDeleteCaracter(+caracter.id)}
								>
									Deletar
								</button>
							</div>
						))}
					</div>
				</div>
				{filteredData?.length === 0 && (
					<div className="w-screen">
						<p className="text-center">
							Não encontramos nenhum personagem com o nome:{' '}
							<strong>{searchWord}</strong> =(
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CaractersView;
