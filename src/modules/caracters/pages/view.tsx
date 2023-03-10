import { BiSearchAlt2 } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import LoadingToast from '../../../components/LoadingToast';
import { Caracter } from '../../../types/Caracter';

import Lottie from 'lottie-react';

import logo from '../../../assets/logo.png';
import CaracterCard from '../components/CaracterCard';

import loadingAnimation from '../../../assets/animations/loadingAnimation.json';

interface CaractersViewI {
	caracters: Caracter[] | undefined;
	searchWord: string;
	handleInputChange: (e: string) => void;
	handleCleanupInput: () => void;
	filteredData: Caracter[] | undefined;
	isLoading: boolean;
	handleOpenModal: (caracter: Caracter) => void;
	isModalOpen: boolean;
	singleCaracter: Caracter | null;
	handleCloseModal: () => void;
	loadingCaracter: boolean;
	showAnimation: boolean;
}

const CaractersView = ({
	caracters,
	searchWord,
	handleInputChange,
	handleCleanupInput,
	filteredData,
	isLoading,
	handleOpenModal,
	isModalOpen,
	singleCaracter,
	handleCloseModal,
	loadingCaracter,
	showAnimation,
}: CaractersViewI) => {
	const screenWidth = document.documentElement.clientWidth;

	if (showAnimation) {
		return (
			<div className="w-screen max-w-full">
				<div className="w-full flex justify-center items-center ">
					<div className="w-[300px] py-6 cursor-pointer">
						<img src={logo} alt="logotipo do rick and morty" />
					</div>
				</div>
				<div className="w-full h-full flex items-center justify-center">
					<div
						className={
							screenWidth < 600 ? 'w-[250px] h-[250px]' : 'w-[400px] h-[400px]'
						}
					>
						<Lottie animationData={loadingAnimation} loop={true} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full pb-40">
			<div className="flex flex-col gap-2 min-w-full mb-8">
				<div className="w-full flex justify-center items-center ">
					<div className="w-[300px] py-6 cursor-pointer">
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

					<div className="flex m-auto flex-wrap flex-row gap-4 items-center justify-center  w-full">
						{!isLoading && caracters?.length === 0 ? (
							<p>N??o h?? personagens para</p>
						) : null}
						{(filteredData! || caracters).map((caracter: Caracter) => (
							<CaracterCard
								key={caracter.id}
								caracter={caracter}
								handleOpenModal={handleOpenModal}
							/>
						))}
					</div>
				</div>
				{isModalOpen && (
					<>
						<div
							className="w-screen h-screen min-w-full min-h-full fixed left-0 right-0 bottom-0 z-10 backdrop-blur-xl bg-[rgba(0,0,0,0.6)] flex justify-center items-center"
							style={{
								zIndex: 1,
							}}
							onClick={() => handleCloseModal()}
						/>

						<div className="lg:w-[40%] md:w-[80%] sm:w-[90%] w-[90%] bg-white rounded-xl py-4 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 fixed z-20">
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
										<strong>Situa????o: </strong>
										{singleCaracter?.status === 'Alive' && 'Vivo'}
										{singleCaracter?.status === 'Dead' && 'Morto'}
										{singleCaracter?.status === 'unknown' && 'S?? deus sabe'}
									</p>
									<p className="pt-2">
										<strong>Esp??cie:</strong>{' '}
										{singleCaracter?.species === 'Human' && 'Humano'}
										{singleCaracter?.species === 'Alien' && 'Alien??gena'}
									</p>
									<p className="pt-2">
										<strong>G??nero: </strong>
										{singleCaracter?.gender === 'Male' && 'Masculino'}
										{singleCaracter?.gender === 'Female' && 'Feminino'}
									</p>
									<p className="py-2">
										<strong>Localiza????o: </strong>
										{singleCaracter?.location.name}
									</p>
								</div>
							)}
						</div>
					</>
				)}
				{filteredData?.length === 0 && (
					<div className="w-screen">
						<p className="text-center">
							N??o encontramos nenhum personagem com o nome:{' '}
							<strong>{searchWord}</strong> =(
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default CaractersView;
