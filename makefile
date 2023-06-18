build:
	esbuild ./src/index.tsx --bundle --sourcemap --outfile=./index.js --watch

serve:
	python3 -m http.server 9292

