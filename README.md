# Pagar.me Challenge

## Stack

- Task Runner: [Gulp](http://gulpjs.com/)
- CSS Preprocessor: [Stylus](http://stylus-lang.com/)

## Run the project locally

**1 -** Prepare the environment:

```sh
$ npm install -g gulp-cli
```

**2 -** Clone the project and install the dependencies:

```
$ git clone https://github.com/lucasjs/pagarme-challenge.git
$ cd pagarme-challenge
$ npm install
```

**3 -** Run static server and livereload:

```
$ gulp server
```

## Folders

	.
	├── README.md
	├── build/
	├── src/
	|   ├── img/
	|   ├── styles/
	|   |   └── modules/
	|   ├── svg/	
	|   └── views/
	├── gulpfile.js
	├── package-lock.json
	├── package.json
	└── .gitignore

## Automatic Tasks

- `gulp build:` Compile, concat and minify all files.
- `gulp server:` Watch the files to build and start a static server.
- `gulp deploy:` Deploy for gh-pages.
