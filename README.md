# gulp-about

Gulp plugin useful for generating information about your application build, such as name, version ...

# Installation

Non-lazy people | Lazy people
--------------- | -----------
`npm install --save-dev gulp-about` | `npm i -D gulp-about`

# Usage

## `gulpfile.js`

```js
var about = require('gulp-about');
var gulp = require('gulp');

gulp.task('about', function () {
    return gulp.src('package.json')
        .pipe(about())
        .pipe(gulp.dest('dist'));  // writes dist/about.json
});
```

The above task will produce the file `about.json` in the folder `dist`. By default, only the _name_ and the _version_ of the application are written.

# Options

Pass options to `gulp-about`:

```js
gulp.task('about', function () {
    return gulp.src('package.json')
        .pipe(about({
            keys: ['name', 'version', 'author']
        }))
        .pipe(gulp.dest('dist'));
});
```

### keys

Type: `String | String[]`
Default: `['name', 'version']`

The properties to keep from the source file.

### fileName

Type: `String`
Default: `about.json`

The name of the destination file.

### indent

Type: `Number`
Default: `2`

The number of spaces used for indentation in the destination file.

# License

gulp-about is Copyright (c) 2015 Michael P. Bazos and licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.