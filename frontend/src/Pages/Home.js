import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateGame from "../Components/CreateGame";
import GameCard from "../Components/GameCard";
import Modal from "../Components/Modal";

function Home() {
	const [games, setGames] = useState([]);
	const [userData, setUserData] = useState({});
	const [isVisible, setIsVisible] = useState(false);
	useEffect(() => {
		let data = localStorage.getItem("userInfo");
		data = JSON.parse(data);
		setUserData(data);
		axios
			.get(process.env.REACT_APP_API_URL + `/home/${data.username}`)
			.then((response) => {
				console.log(response.data);
				setGames(response.data);
			});
	}, [isVisible]);

	return (
		<div className='w-screen h-full flex flex-col py-4 px-6 bg-neutral-100'>
			<h1 className='font-bold text-neutral-800 text-4xl'>Your Games</h1>
			<CreateGame setIsVisible={setIsVisible} />
			{isVisible && <Modal setIsVisible={setIsVisible} />}
			<div className='h-full my-4 overflow-scroll'>
				{games &&
					games.map((singlegame) => {
						return <GameCard singlegame={singlegame} />;
					})}
				{!games.length && (
					<div className='w-full h-full flex flex-col justify-center items-center'>
						<h1 className=' font-bold text-neutral-800 text-3xl '>
							There are no games <br></br>
						</h1>
						<h1
							onClick={setIsVisible}
							className=' font-bold text-red-500 text-3xl underline'>
							Create One ?
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
