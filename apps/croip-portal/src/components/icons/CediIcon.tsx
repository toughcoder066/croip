import type { SVGProps } from 'react'

export function CediIcon({ className = 'size-4', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className={className}
      {...props}
    >
      <line x1='12' y1='2.5' x2='12' y2='21.5' />
      <path d='M16.8 6.5C15.4 5.2 13.5 4.5 11.5 4.5C7.5 4.5 4.5 7.8 4.5 12s3 7.5 7 7.5c2 0 3.9-0.7 5.3-2' />
    </svg>
  )
}

export default CediIcon
