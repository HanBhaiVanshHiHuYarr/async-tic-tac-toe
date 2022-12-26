import React from 'react'

function Move({val}) {

    return (
			<div className='h-full w-full'>
				{val === "X" && (
					<div className='h-full pt-5 w-full text-6xl font-black text-blue-600'>
                         {val}
					</div>
				)}
				{val === "O" && (
					<div className='h-full pt-5 w-full text-6xl font-black text-red-600'>
						{val}
					</div>
				)}
			</div>
		);
}

export default Move