"use client";

import React from "react";
import { Button as HeroButton, ButtonProps } from "@heroui/react";
import { cn } from "@/lib/utils";

// Omit the conflicting props from HeroUI's ButtonProps
interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'size' | 'onClick'> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
  customVariant?: "primary" | "secondary" | "outline" | "filter" | "card" | "happenings" | "newsletter";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, customVariant = "primary", size = "md", fullWidth = false, children, ...props }, ref) => {
    // Base styles that apply to all buttons
    const baseStyle = "flex rounded-[12px] text-center font-bold leading-5 tracking-[0.25px]";
    
    // Size variations
    const sizeStyles = {
      xs: "h-[30px] px-3 py-1 text-xs",
      sm: "h-[40px] px-4 py-1.5 text-sm",
      md: "h-[50px] px-5 py-2 text-base",
      lg: "h-[60px] px-6 py-3 text-lg",
      xl: "h-[60px] px-4 py-1 text-base tracking-[0.25px] rounded-[12px]"
    };
    
    // Variant styles
    const variantStyles = {
      // Main variants from HeroSection
      primary: "bg-[#E7343A] text-white hover:bg-red-700",
      secondary: "bg-[#1E1E1E] text-[#E7343A] hover:bg-gray-700 border border-transparent",
      
      // Course card button style
      card: "bg-red-600 hover:bg-red-700 text-white font-medium",
      
      // Filter button style (for course filters)
      filter: "border transition-all hover:text-red-500",
      
      // View all courses button
      outline: "border border-gray-300 hover:bg-gray-100 text-white font-medium",
      
      // Happenings page primary button
      happenings: "bg-red-500 hover:bg-red-600 text-white",
      
      // Happenings page newsletter button
      newsletter: "bg-stone-900 hover:bg-stone-800 text-red-500 border border-red-500"
    };
    
    // Width control
    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <HeroButton
        ref={ref}
        className={cn(
          baseStyle, 
          sizeStyles[size], 
          variantStyles[customVariant], 
          widthStyle,
          className
        )} 
        onPress={(e) => props.onClick?.(e as any)}
        {...props}
      >
        {children}
      </HeroButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
