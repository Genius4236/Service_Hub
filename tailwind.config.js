/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backdropBlur: {
				sm: '4px',
			  },
			colors: {
				'custom-blue': '#1E40AF',
				'custom-green': '#10B981',
				'custom-gray': '#6B7280',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
			},
		  },
		},
	plugins: [],
}
