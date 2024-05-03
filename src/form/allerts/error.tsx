

interface ErrorProps {
  
}

const Error: React.FC<ErrorProps> = ({  }) => {
  return (
    <div className='flex gap-3 bg-red-100 p-4'>
      <div className='flex-[0]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='stroke-red-500'
        >
          <circle cx='12' cy='12' r='10' />
          <path d='m4.9 4.9 14.2 14.2' />
        </svg>
      </div>
      <div>
        <h3 className='text-lg font-extrabold'>titel of alert unseccess</h3>
        <p>description of alert Lorem ipsum dolor sit.</p>
      </div>
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='stroke-red-500'
        >
          <path d='M18 6 6 18' />
          <path d='m6 6 12 12' />
        </svg>
      </div>
    </div>
  )
}

export default Error;