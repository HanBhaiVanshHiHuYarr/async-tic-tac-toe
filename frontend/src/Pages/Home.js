import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateGame from "../Components/CreateGame";
import GameCard from "../Components/GameCard";
import Modal from "../Components/Modal";

const io = require("socket.io-client");

function Home() {
	const [games, setGames] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [game, setGame] = useState({});
	const navigate = useNavigate();
	let data = localStorage.getItem("userInfo");
	data = JSON.parse(data);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		if (data == undefined) {
			navigate("/login");
		}
		let tempSock = io(process.env.REACT_APP_API_URL);
		setSocket(tempSock);
	}, []);

	useEffect(() => {
		if (socket) {
			socket.emit("newgame", game);
		}
	}, [game]);

	useEffect(() => {
		if (socket) {
			socket.on("newgamecreated", (minigame) => {
				if (minigame.player2 == data.username) {
					setGames([...games, minigame]);
				}
			});
		}
	});

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_API_URL + `/home/${data.username}`)
			.then((response) => {
				setGames(response.data);
			});
	}, [isVisible]);

	return (
		<div className='w-screen h-full flex flex-col py-4 px-6 bg-neutral-100'>
			<h1 className='font-bold text-neutral-800 text-4xl'>Your Games</h1>
			<CreateGame setIsVisible={setIsVisible} />
			{isVisible && <Modal setIsVisible={setIsVisible} setGame={setGame} />}
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
