var about = require('../');
var expect = require('chai').expect;
var fs = require('fs');
var gutil = require('gulp-util');
var path = require('path');


describe('gulp-about', function () {
    var data;

    beforeEach(function () {
        data = fs.readFileSync(path.join(__dirname, 'fixtures/package.json'));
    });

    it('should generate an object with only name and version properties', function (cb) {
        var stream = about();

        stream.on('data', function (data) {
            var output = JSON.parse(data.contents.toString());
            expect(output).to.deep.equal({name: 'gulp-about', version: 'x.y.z'});
        });

        stream.on('end', cb);
        stream.write(new gutil.File({contents: data}));
        stream.end();
    });

    it('should generate an object with name, version and author properties', function (cb) {
        var stream = about({
            keys: ['name', 'version', 'author']
        });

        stream.on('data', function (data) {
            var output = JSON.parse(data.contents.toString());
            expect(output).to.deep.equal({name: 'gulp-about', version: 'x.y.z', author: 'Obi-Wan Kenobi'});
        });

        stream.on('end', cb);
        stream.write(new gutil.File({contents: data}));
        stream.end();
    });

    it('should generate an object with name, version and buildNumber properties', function (cb) {
        var stream = about({
            inject: {
                buildNumber: '12345'
            }
        });

        stream.on('data', function (data) {
            var output = JSON.parse(data.contents.toString());
            expect(output).to.deep.equal({name: 'gulp-about', version: 'x.y.z', buildNumber: '12345'});
        });

        stream.on('end', cb);
        stream.write(new gutil.File({contents: data}));
        stream.end();
    });
});