'use strict';

var gutil = require('gulp-util');
var defaults = require('lodash.defaults');
var merge = require('lodash.merge');
var path = require('path');
var pick = require('lodash.pick');
var through = require('through2');

var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-about';

var defaultOptions = {
    fileName: 'about.json',
    indent: 2,
    inject: {},
    keys: ['name', 'version']
};


module.exports = function (options) {
    var output,
        opts = options || {};
    defaults(opts, defaultOptions);

    return through.obj(function (file, encoding, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming is not supported'));
            return;
        }

        try {
            output = pick(JSON.parse(file.contents.toString()), opts.keys);
            merge(output, opts.inject);
            file.path = path.join(file.base, opts.fileName);
            file.contents = new Buffer(JSON.stringify(output, null, opts.indent));
            this.push(file);
        } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err, {fileName: file.path}));
        }

        cb();
    });
};
