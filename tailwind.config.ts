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
			primary: '#000000',    // 黑色，作为主色
			secondary: '#F5F5F5',  // 非常浅的灰白色，作为背景色
			accent: '#808080',     // 灰色，用于强调文字或装饰
			warning: '#E5E7EB',    // 浅灰色，适用于警告
			danger: '#4B5563',     // 深灰色，用于危险警告
			textPrimary: '#1F2937', // 深灰色，主要文本颜色
			textSecondary: '#6B7280', // 浅灰色，次要文本颜色
			darkBg: '#111827',     // 深色背景，适合暗模式
			darkContentBg: '#1F2937', // 暗色内容背景
			lightText: '#FFFFFF',  // 白色文本，适合深色背景
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
