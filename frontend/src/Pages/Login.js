import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const userinfo = localStorage.getItem("userInfo");
	useEffect(() => {
		if (userinfo != undefined) {
			navigate("/home");
		}
	},[])
	

	const created = () =>
		toast.success("Login successful", {
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
				process.env.REACT_APP_API_URL + "/login",
				{ username, password },
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
			<h1 className='mt-7 font-bold text-neutral-700'>Login</h1>
			<h1 className=' font-bold text-neutral-800 text-3xl'>
				Please enter your <br></br> details
			</h1>

			<form
				onSubmit={handleSubmit}
				className='h-full w-full flex flex-col justify-between py-7 '>
				<div className='flex flex-col '>
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

					<div className='flex flex-col mt-6'>
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
				</div>

				<button
					className='drop-shadow-md text-xl text-white bg-yellow-400 p-3 rounded-md m-4 order-last'
					type='submit'>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
