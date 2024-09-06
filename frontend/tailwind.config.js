/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
	
  theme: {
    extend: {
			colors: {
				'primary': '#7284FE',
				'classhub-gray': '#dcdcdc',
				'classhub-lavender': '#eef2fe',
			},
			backdropBlur: {
        xs: '3px',
      },
			animation: {
				"fade-out": 'fadeOut 1s ease-in-out',
				"fade-in": 'fadeIn 1s ease-in-out',
			},
			keyframes: {
				fadeOut: {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
		},
		fontFamily: {
			"roboto": ['Roboto'],
			"inter": ['Inter'],
		}
  },
  plugins: [
    daisyui,
  ],
}

