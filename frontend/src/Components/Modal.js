import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Modal({ setIsVisible, setGame }) {
	const [username, setUsername] = useState("");
	const navigate = useNavigate();
	const successToast = (data) =>
		toast.success(data, {
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

	const handleClick = () => {
		if (username == "") {
			ErrorToast("Please enter a username");
		} else {
			let userinfo = localStorage.getItem("userInfo");
			userinfo = JSON.parse(userinfo);
			const finaldata = {
				player1: userinfo.username,
				player2: username,
				turn: userinfo.username,
				b1: "",
				b2: "",
				b3: "",
				b4: "",
				b5: "",
				b6: "",
				b7: "",
				b8: "",
				b9: "",
				winner: "",
			};

			
			axios
				.post(process.env.REACT_APP_API_URL + "/creategame", finaldata)
				.then((response) => {
					setGame(response.data)
					successToast("Game created successfully");
					setIsVisible(false);
					navigate("/home");
				})
				.catch((error) => {
					// console.log(error.response)
					ErrorToast(error.response.data.message);
				});
		}
	};

	return (
		<div className='w-screen h-screen top-0 left-0 fixed bg-neutral-200/70 z-50 flex justify-center items-center'>
			<ToastContainer />
			<div className='bg-white h-1/2 w-4/5 rounded-2xl drop-shadow-xl flex flex-col p-4 justify-between'>
				<h1 className=' font-bold text-center text-neutral-800 text-3xl'>
					Whom do you wanna play with ?
				</h1>

				<div className='flex flex-col'>
					<label className='font-bold text-neutral-800'>
						Opponent's Username
					</label>
					<input
						type='text'
						className='bg-neutral-100 rounded-md p-3'
						placeholder='Enter username here'
						value={username}
						required
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className='flex w-full justify-between'>
					<button
						className='w-2/5 drop-shadow-md text-xl text-white bg-red-500 p-2 rounded-md'
						onClick={() => {
							setIsVisible(false);
						}}>
						Close
					</button>
					<button
						className='w-2/5 drop-shadow-md text-xl text-white bg-green-500 p-2 rounded-md'
						onClick={handleClick}>
						Create
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
