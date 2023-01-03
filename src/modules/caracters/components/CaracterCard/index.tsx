import { Caracter } from '../../../../types/Caracter';

interface CaracterCardProps {
	caracter: Caracter;
	handleOpenModal: (caracter: Caracter) => void;
}

const CaracterCard = ({ caracter, handleOpenModal }: CaracterCardProps) => {
	return (
		<div
			key={caracter.id}
			className="lg:w-[30%] md:w-[40%] sm:w-[70%] bg-stone-100 flex flex-col justify-center border-solid border-2 border-gray-300 p-6 rounded-xl hover:scale-105 duration-200 ease-in shadow-lg shadow-gray-300 cursor-pointer"
			onClick={() => handleOpenModal(caracter)}
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
				<strong>Espécie:</strong> {caracter.species === 'Human' && 'Humano'}
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
	);
};

export default CaracterCard;
