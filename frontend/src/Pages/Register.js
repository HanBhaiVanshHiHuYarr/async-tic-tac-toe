import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function Register() {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const userinfo = localStorage.getItem("userInfo");
	useEffect(() => {
		if (userinfo != undefined) {
			navigate("/home");
		}
	}, []);
	const created = () =>
		toast.success("Account created successfully", {
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const { data } = await axios.post(
				process.env.REACT_APP_API_URL + "/register",
				{ name, email, username, password },
				config
			);
			localStorage.setItem("userInfo", JSON.stringify(data));
			created();
			setTimeout(() => {
				navigate("/home");
			}, 1000);
		} catch (error) {
			ErrorToast(error.response.data.message);
		}
	};

	return (
		<div className='w-screen h-full flex flex-col py-4 px-6'>
			<ToastContainer />
			<h1 className='font-black text-4xl' onClick={() => navigate("/")}>
				{"<"}
			</h1>
			<h1 className='mt-7 font-bold text-neutral-700'>Create Account</h1>
			<h1 className=' font-bold text-neutral-800 text-3xl'>
				Let's get to know <br></br> you better !
			</h1>

			<form
				onSubmit={handleSubmit}
				className='h-full w-full flex flex-col py-7 justify-evenly'>
				<div className='flex flex-col'>
					<label className='font-bold text-neutral-800'>Your Name</label>
					<input
						type='text'
						className='bg-neutral-100 rounded-md p-3'
						placeholder='Enter your name here'
						value={name}
						required
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='font-bold text-neutral-800'>Username</label>
					<input
						type='text'
						className='bg-neutral-100 rounded-md p-3'
						placeholder='Enter your username here'
						value={username}
						required
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='font-bold text-neutral-800'>Email</label>
					<input
						type='email'
						className='bg-neutral-100 rounded-md p-3'
						placeholder='Enter your email here'
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='flex flex-col'>
					<label className='font-bold text-neutral-800'>Password</label>
					<input
						type='password'
						className='bg-neutral-100 rounded-md p-3'
						placeholder='Enter your password here'
						value={password}
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button
					type='submit'
					className='drop-shadow-md text-xl text-white bg-yellow-400 p-3 rounded-md m-4'>
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;
