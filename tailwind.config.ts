import type { Config } from 'tailwindcss'

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                appPurple: '#B7ABF7',
                appGreen: '#40E080',
                appDarkRed: '#DC2626',
                appRed: '#FF6B6B',
                appGrey: '#CFD3E5',
                appGrey2: '#F5F5F5',
                appStroke: '#31354B',
                appDarkerPurple: '#B5A8F7',
                appDarkBlue: '#1C1C1C',
                appLightGrey: '#B5B7C1',
                appPurpleHover: '#9186C6',
            },
            fontFamily: {
                inter: ['Inter', 'serif'],
            },
        },
    },
    plugins: [],
} satisfies Config
