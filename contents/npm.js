const npm = `
{
  "name": "react-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "babel-node server.js",
    "launch": "nodemon --exec babel-node server.js"
  },
  "author": "Sean Campbell",
  "license": "MIT",
  "dependencies": {
    "babel": "^6.0.15",
    "body-parser": "^1.14.1",
    "express": "^4.13.3",
    "react": "^0.14.2",
    "react-dom": "^0.14.2"
  },
  "devDependencies": {
    "babel-cli": "^6.1.2",
    "babel-core": "^6.1.2",
    "babel-eslint": "^4.1.4",
    "babel-preset-es2015": "^6.1.2",
    "babel-preset-react": "^6.1.2",
    "babelify": "^7.2.0",
    "browserify": "^12.0.1",
    "gulp": "^3.9.0",
    "gulp-eslint": "^1.0.0",
    "gulp-notify": "^2.2.0",
    "gulp-plumber": "^1.0.1",
    "vinyl-source-stream": "^1.1.0"
  }
}

`