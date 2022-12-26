import React from 'react'

function CreateGame({ setIsVisible}) {
	return (
		<button className='py-2 px-4 rounded bg-blue-900 text-white font-semibold fixed bottom-6 right-6 w-fit z-50 ' onClick = {()=>{setIsVisible(true)}}>
			Create Game
		</button>
	);
}

export default CreateGame