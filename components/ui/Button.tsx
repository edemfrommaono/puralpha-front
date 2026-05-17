import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'navy' | 'outline-navy' | 'teal' | 'gold';

interface BaseButtonProps {
  variant?: ButtonVariant;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

type ButtonAsButton = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type ButtonAsLink = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  navy: "bg-navy-800 text-white hover:bg-navy-900",
  "outline-navy": "border border-navy-800 text-navy-800 hover:bg-navy-50",
  teal: "bg-teal-400 text-white hover:bg-teal-500",
  gold: "bg-gold-500 text-navy-800 hover:bg-gold-600 shadow-[0px_4px_15px_0px_rgba(242,201,76,0.3)]",
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className = '', variant = 'navy', iconLeft, iconRight, children, href, ...props }, ref) => {
    // Le bouton 'gold' est généralement plus arrondi (rounded-full) dans la maquette
    const defaultRounding = variant === 'gold' ? 'rounded-full px-8 py-3.5' : 'rounded-lg px-5 py-2.5';
    
    const combinedClassName = `inline-flex items-center justify-center gap-2 font-poppins font-bold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] ${defaultRounding} ${variantStyles[variant]} ${className}`;

    const innerContent = (
      <>
        {iconLeft && <span className="shrink-0 flex items-center">{iconLeft}</span>}
        {children}
        {iconRight && <span className="shrink-0 flex items-center">{iconRight}</span>}
      </>
    );

    if (href) {
      return (
        <Link 
          href={href} 
          className={combinedClassName} 
          ref={ref as React.ForwardedRef<HTMLAnchorElement>} 
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={combinedClassName}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {innerContent}
      </button>
    );
  }
);

Button.displayName = 'Button';
