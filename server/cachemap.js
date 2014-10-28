/* jshint node:true, es3:false */

"use strict";

var path = require('path'),	
		fs = require('fs'),
		crypto = require("crypto");

var EXTNAME_MD5 = /\.[a-fA-F0-9]{32}$/;

function cachemap(dir, callback) {	

	var count = 0, map = {}, root = path.dirname(dir);
	
	if(root === dir) { 
		root = ''; 
	}

	function wait() {
		count++;
	}

	function done() {
		count--;
		if (count===0) {
			callback(map);
		}
	}

	function resolve(file) {
		if(root !== '') {
			return '/' + path.relative(root, file);
		} else {
			return '/' + file;
		}
	}
	function walk(dir) {
		wait();
		fs.readdir(dir, function(err, files) {
			files.forEach(function(filename) {
				hash(path.join(dir,filename));
			});
			done();
		});
	}

	function hash(file) {
		wait();
		fs.lstat(file, function(err, stats){
			if(stats.isDirectory()) {
				walk(file);
			} else if(EXTNAME_MD5.test(path.extname(file))) {
				map[resolve(file.replace(EXTNAME_MD5, ''))] = resolve(file);
			} else {
				read(file);
			}
			done();
		});
	}

	function read(file) {
		wait();
		fs.readFile(file, 'utf8', function(err, data) {
			map[resolve(file)] = resolve( file + '.' + crypto
        											 			.createHash('md5')
        											 			.update(data, 'utf8')
        											 			.digest('hex')
																	);
			done();
		});
	}

	wait();	
	walk(dir);
	done();
}

module.exports = cachemap;
