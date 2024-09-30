import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	'./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#2563EB',
  			secondary: '#F3F4F6',
  			accent: '#10B981',
  			warning: '#F59E0B',
  			danger: '#EF4444',
  			textPrimary: '#1F2937',
  			textSecondary: '#9CA3AF',
  			darkBg: '#111827',
  			darkContentBg: '#1F2937',
  			lightText: '#F9FAFB',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
