import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const baseStyles = 'inline-flex items-center justify-center rounded px-7 py-3 text-button uppercase tracking-widest transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal'

const variants = {
  primary: 'bg-brand-teal text-white hover:bg-[#234A48]',
  secondary: 'border border-brand-teal text-brand-teal bg-transparent hover:bg-brand-teal hover:text-white',
}

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  const classes = `${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
