import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function App() {
	
  const handleClick = () => {
    navigate("/login");
    // socket.emit('send-message')
  }

	const navigate = useNavigate();
	return (
		<div className='w-screen h-full flex flex-col p-6'>
			<div className='grow p-14 flex flex-col justify-center'>
				<h1 className='text-neutral-700 text-4xl font-semibold'>Async</h1>
				<h1 className='text-neutral-800 text-7xl font-bold'>Tic Tac Toe</h1>
			</div>
			<div className=' flex flex-col'>
				<button
					className='drop-shadow-md text-xl text-white bg-yellow-400 p-3 rounded-md m-4'
					onClick={handleClick}>
					Login
				</button>
				<button
					className='drop-shadow-md text-xl text-white bg-blue-600 p-3 rounded-md m-4'
					onClick={() => navigate("/register")}>
					Register
				</button>
			</div>
		</div>
	);
}

export default App;
