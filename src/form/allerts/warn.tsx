import { cn } from '../cn'
import { ValidationError } from '@tanstack/react-form'
import { CircleAlert } from 'lucide-react'

interface WarnProps {
  error: ValidationError[]
  title: string
  className: string
}

const Warn: React.FC<WarnProps> = ({ error, title, className }) => {
  if (!error) return null
  return error.length ? (
    <div
      className={cn(
        'absolute -bottom-[23px] flex w-full max-w-[600px] items-center gap-3 text-nowrap ',
        className
      )}
      // className={cn(
      //   'absolute flex gap-3 rounded border border-solid border-[#F9DBA2] bg-[#FFF2D8] p-4',
      //   className
      // )}
    >
      <CircleAlert className='size-4 stroke-red-300' />
      <h3 className='flex-[1] text-fs-base font-extrabold text-red-500 sm:hidden'>
        {title}:{' '}
      </h3>
      <p className='inline flex-[2] text-fs-sm text-red-600'>{error}</p>
    </div>
  ) : null
}

export default Warn
