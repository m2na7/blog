import { cn } from '@/utils/cn'

interface TitleProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  align?: 'left' | 'center' | 'right'
}

const titleSizes = {
  sm: 'text-xl font-semibold',
  md: 'text-2xl font-bold',
  lg: 'text-3xl font-bold',
  xl: 'text-4xl font-bold',
}

const alignments = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export default function Title({
  children,
  size = 'lg',
  className,
  align = 'left',
}: TitleProps) {
  return (
    <h1
      className={cn(
        titleSizes[size],
        alignments[align],
        'text-gray-900 dark:text-white',
        className
      )}
    >
      {children}
    </h1>
  )
}
