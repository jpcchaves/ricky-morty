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
	handleChangeTitle: (caracter: Caracter) => void;
	isModalOpen: boolean;
	singleCaracter: Caracter | null;
	handleCloseModal: () => void;
	loadingCaracter: boolean;
}

const CaractersView = ({
	caracters,
	searchWord,
	handleInputChange,
	handleCleanupInput,
	filteredData,
	isLoading,
	handleChangeTitle,
	isModalOpen,
	singleCaracter,
	handleCloseModal,
	loadingCaracter,
}: CaractersViewI) => {
	return (
		<div className="w-full h-full pb-40">
			<div className="flex flex-col gap-2 min-w-full mb-8">
				<div className="w-full flex justify-center items-center ">
					<div className="w-[300px] py-6 ">
						<img src={logo} alt="logotipo do rick and morty" />
					</div>
				</div>

				<div className="flex flex-row justify-center items-center gap-8 ">
					<div className="sm:w-[90%] md:w-[70%] lg:w-[60%] w-[90%]">
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
										className="bg-white px-6 text-lg font-semibold py-4"
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
				<div className="flex w-full flex-col items-center justify-center">
					{isLoading && <LoadingToast />}

					<div className="flex m-auto flex-wrap flex-row gap-4 items-center justify-center">
						{!isLoading && caracters?.length === 0 ? (
							<p>Não há personagens para</p>
						) : null}
						{(filteredData! || caracters).map((caracter: Caracter) => (
							<div
								key={caracter.id}
								className="lg:w-[30%] md:w-[40%] sm:w-[70%] bg-stone-100 flex flex-col justify-center border-solid border-2 border-gray-300 p-6 rounded-xl hover:scale-105 duration-200 ease-in shadow-lg shadow-gray-300 cursor-pointer"
								onClick={() => handleChangeTitle(caracter)}
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
								<button className="bg-blue-500 py-3 px-4 rounded text-white w-[100%] m-auto mt-6 hover:bg-blue-600 hover:text-black duration-150 ease-in">
									Visualizar
								</button>
							</div>
						))}
					</div>
				</div>
				{isModalOpen && (
					<div className="w-screen h-screen min-w-full min-h-full fixed left-0 right-0 bottom-0 z-[999] backdrop-blur-xl bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
						<div className="lg:w-[40%] md:w-[80%] sm:w-[90%] w-[90%] bg-white rounded-xl py-4">
							<div className="flex justify-end items-center">
								<div className="mb-4" onClick={() => handleCloseModal()}>
									<AiOutlineClose className="mr-4 cursor-pointer " size={22} />
								</div>
							</div>
							{loadingCaracter ? (
								<div className="flex justify-center items-center">
									<LoadingToast />
								</div>
							) : (
								<div className="flex justify-center items-center flex-col">
									<h2 className="text-2xl text-center mb-4">
										{singleCaracter?.name}
									</h2>
									<div className="m-auto rounded-full mb-4">
										<img
											className="object-cover rounded-full"
											src={singleCaracter?.image}
											alt="foto do personagem"
										/>
									</div>
									<p className="pt-2">
										<strong>Situação: </strong>
										{singleCaracter?.status === 'Alive' && 'Vivo'}
										{singleCaracter?.status === 'Dead' && 'Morto'}
										{singleCaracter?.status === 'unknown' && 'Só deus sabe'}
									</p>
									<p className="pt-2">
										<strong>Espécie:</strong>{' '}
										{singleCaracter?.species === 'Human' && 'Humano'}
										{singleCaracter?.species === 'Alien' && 'Alienígena'}
									</p>
									<p className="pt-2">
										<strong>Gênero: </strong>
										{singleCaracter?.gender === 'Male' && 'Masculino'}
										{singleCaracter?.gender === 'Female' && 'Feminino'}
									</p>
									<p className="py-2">
										<strong>Localização: </strong>
										{singleCaracter?.location.name}
									</p>
								</div>
							)}
						</div>
					</div>
				)}
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
