import React from 'react'

const Why = ({data}) => {
  return (
    <div className=''>
      {data.map((rec, index) => (
        <p key={index} className='bg-white dark:bg-slate-950 p-2 text-black dark:text-white rounded-md shadow-md my-2'>{rec}</p>
      ))}
    </div>
  )
}

export default Why