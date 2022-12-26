import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Move from "../Components/Move";
const io = require("socket.io-client");

function Game() {
	const navigate = useNavigate();
	const { state } = useLocation();
	let userInfo = localStorage.getItem("userInfo");
	userInfo = JSON.parse(userInfo);

	const [socket, setSocket] = useState(null);
	const [data, setData] = useState(state);
const successToast = (msg) =>
	toast.success(msg, {
		position: "bottom-center",
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		theme: "light",
	});

const ErrorToast = (error) =>
	toast.error(error, {
		position: "bottom-center",
		autoClose: 1000,
		hideProgressBar: false,
		closeOnClick: true,
		theme: "light",
	});

	useEffect(() => {
		let tempSock = io(process.env.REACT_APP_API_URL);
		tempSock.emit("setup",userInfo);
		setSocket(tempSock);
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on("message received", (newMessageReceived) => {
				setData(newMessageReceived);
			});
			
		}
	})

	useEffect(() => {
		if (socket) {
			socket.emit("join room", state._id);
		}
	}, [socket]);

	const [user, setUser] = useState(userInfo.username);
	const [opponent, setOpponent] = useState(() => {
		return state.player1 == userInfo.username ? state.player2 : state.player1;
	});
	const [piece, setPiece] = useState("O");
	const [place, setPlace] = useState("");
	const [turn, setTurn] = useState(state.turn);

	useEffect(() => {
		if (data?.player1 == user) {
			setPiece("X");
		}
		if (data?.turn == user && data?.winner == "") {
			setTurn(true);
		} else {
			setTurn(false);
		}

		if (data?.winner != "") {
			successToast(`${data.winner} wins !!`)
			setTurn(false);
			setText(data.winner + " wins!");
			setPlace("")
		}

	}, [data]);

	const [text, setText] = useState("Your Turn");

	useEffect(() => {
		if (data?.winner != "") {
			setText(data.winner + " wins!");
		} else if (turn) {
			setText("Your turn");
		} else {
			setText("Opponent's Turn");
		}
	}, [turn]);

	const handleButton = (box) => {
		if (turn) {
			if (data[box] == "") {
				setPlace(box);
			} else {
				ErrorToast("Box already filled");
			}
		} else {
			if (data.winner != "") {
				successToast(data.winner + " has already won!");
			} else {
				ErrorToast("Not your turn");
			}
		}
	};

	const handleSubmit = () => {
		if (place == "") {
			ErrorToast("Please choose a box");
		} else {
			let nextturn = data.turn == user ? opponent : user;
			let finaldata = { ...data, [place]: piece, turn: nextturn };
			const winner = checkWinner(finaldata);
			if (winner == "X" || winner == "O") {
				finaldata = { ...finaldata, winner: winner };
			}
			setData(finaldata);
			axios.put(process.env.REACT_APP_API_URL + `/updategame`, finaldata);
			socket.emit("new message", finaldata);
		}
	};

	const checkWinner = (finaldata) => {
		if (finaldata.b1 == finaldata.b2 && finaldata.b1 == finaldata.b3) {
			return finaldata.b1;
		}
		if (finaldata.b6 == finaldata.b4 && finaldata.b6 == finaldata.b5) {
			return finaldata.b5;
		}
		if (finaldata.b7 == finaldata.b8 && finaldata.b7 == finaldata.b9) {
			return finaldata.b9;
		}
		if (finaldata.b1 == finaldata.b4 && finaldata.b1 == finaldata.b7) {
			return finaldata.b1;
		}
		if (finaldata.b5 == finaldata.b2 && finaldata.b5 == finaldata.b8) {
			return finaldata.b2;
		}
		if (finaldata.b3 == finaldata.b6 && finaldata.b3 == finaldata.b9) {
			return finaldata.b9;
		}
		if (finaldata.b1 == finaldata.b5 && finaldata.b1 == finaldata.b9) {
			return finaldata.b1;
		}
		if (finaldata.b3 == finaldata.b5 && finaldata.b3 == finaldata.b7) {
			return finaldata.b3;
		}
		return "";
	};

	return (
		<div className='w-screen h-full flex flex-col justify-between py-4 px-6'>
			<ToastContainer />
			<div>
				<h1 className='font-black text-4xl' onClick={() => navigate("/home")}>
					{"<"}
				</h1>

				<h1 className='mt-3 text-3xl font-bold text-neutral-800'>
					Game with {opponent}
				</h1>
				<h1 className='text-xm font-bold text-neutral-700'>Your piece</h1>
				{piece == "X" ? (
					<h1 className='text-6xl font-black text-blue-600'>{piece}</h1>
				) : (
					<h1 className='text-6xl font-black text-red-600'>{piece}</h1>
				)}
			</div>

			<div className='w-[88vw]'>
				<h1 className='text-xm font-bold text-neutral-700 bg-orange-100 py-2 text-center'>
					{text}
				</h1>

				<div className='flex flex-col h-[88vw] divide-y-4 divide-orange-100'>
					{/* main */}
					<div className='flex h-1/3 w-full divide-x-4 divide-orange-100'>
						<button
							className='h-full w-1/3'
							onClick={() => {
								handleButton("b1");
							}}>
							{data && <Move val={data.b1} />}
						</button>
						<button
							className='h-full w-1/3'
							onClick={() => {
								handleButton("b2");
							}}>
							{data && <Move val={data.b2} />}
						</button>
						<button
							className='h-full w-1/3'
							onClick={() => {
								handleButton("b3");
							}}>
							{data && <Move val={data.b3} />}
						</button>
					</div>
					<div className='flex h-1/3 w-full divide-x-4 divide-orange-100'>
						<button
							className='h-full w-1/3'
							onClick={() => {
								handleButton("b4");
							}}>
							{data && <Move val={data.b4} />}
						</button>
						<button
							className='h-full w-1/3'
							onClick={() => {
								handleButton("b5");
							}}>
							{data && <Move val={data.b5} />}
						</button>
						<button
							className='h-full w-1/3'
							onClick={() => {
								handleButton("b6");
							}}>
							{data && <Move val={data.b6} />}
						</button>
					</div>
					<div className='flex h-1/3 w-full divide-x-4 divide-orange-100'>
						<button
							className='h-full w-1/3 '
							onClick={() => {
								handleButton("b7");
							}}>
							{data && <Move val={data.b7} />}
						</button>
						<button
							className='h-full w-1/3 '
							onClick={() => {
								handleButton("b8");
							}}>
							{data && <Move val={data.b8} />}
						</button>
						<button
							className='h-full w-1/3 '
							onClick={() => {
								handleButton("b9");
							}}>
							{data && <Move val={data.b9} />}
						</button>
					</div>
				</div>
			</div>
			<button
				className='drop-shadow-md text-xl text-white bg-yellow-400 p-3 rounded-md mb-2'
				onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
}

export default Game;
