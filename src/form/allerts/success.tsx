interface SuccessProps {}

const Success: React.FC<SuccessProps> = ({}) => {
  return (
    <div className='flex gap-3 bg-green-100 p-4'>
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
          className='stroke-green-500'
        >
          <path d='M22 11.08V12a10 10 0 1 1-5.93-9.14' />
          <path d='m9 11 3 3L22 4' />
        </svg>
      </div>
      <div>
        <h3 className='text-lg font-extrabold'>titel of alert success</h3>
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
          className='stroke-green-500'
        >
          <path d='M18 6 6 18' />
          <path d='m6 6 12 12' />
        </svg>
      </div>
    </div>
  )
}

export default Success
