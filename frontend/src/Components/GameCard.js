import React from "react";
import { useNavigate } from "react-router-dom";

function GameCard({ singlegame }) {
	const navigate = useNavigate();
	let user = localStorage.getItem("userInfo");
	user = JSON.parse(user);
	return (
		<div className='w-full bg-white min-h-44 rounded-lg drop-shadow-lg flex flex-col p-4 mb-4 justify-between'>
			<div>
				<h1 className='font-bold text-neutral-800 text-2xl mb-4'>
					Game with{" "}
					{user.username == singlegame.player1
						? singlegame.player2
						: singlegame.player1}
				</h1>
				<h1 className='font-regular text-neutral-800'>
					{user.username == singlegame.player1
						? singlegame.player2
						: singlegame.player1}{" "}
					made their move!!
				</h1>
				<h1 className='font-regular text-neutral-800'>
					It's your turn to play now
				</h1>
			</div>

			<button
				onClick={() => navigate("/game", { state: singlegame })}
				className='drop-shadow-md font-bold text-white bg-yellow-400 rounded-md mt-4 py-2'>
				Play
			</button>
		</div>
	);
}

export default GameCard;
