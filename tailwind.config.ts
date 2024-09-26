import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',    // 主色调 (蓝色)
        secondary: '#F3F4F6',  // 副色调 (浅灰)
        accent: '#10B981',     // 强调色 (绿色)
        warning: '#F59E0B',    // 警告色 (黄色)
        danger: '#EF4444',     // 错误色 (红色)
        textPrimary: '#1F2937',  // 文本颜色 (深灰)
        textSecondary: '#9CA3AF', // 次要文本颜色 (浅灰)
        darkBg: '#111827',       // 深色模式背景
        darkContentBg: '#1F2937', // 深色模式内容背景
        lightText: '#F9FAFB',    // 深色模式文本
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
