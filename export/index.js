'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('underscore.string');
var recursive = require('recursive-readdir');
var fstream = require('fstream');
var tar = require('tar');
var zlib = require('zlib');


var ExportGenerator = yeoman.generators.Base.extend({

  askFor: function () {
    var done = this.async();
    var prompts = [
    {
      name: 'file',
      message: 'Name of the files to export ?',
    }];

    this.prompt(prompts, function (props) {
      this.params = {
        nameFile: props.file
      }
      done();
    }.bind(this));
  },

  exportFiles: function() {
    var _this=this;
    fs.mkdir(_this.params.nameFile+"Export", function(){
      recursive(process.cwd(), function (err, files) {
          for(var i=0; i<files.length; i++) {
            if(files[i].indexOf(_this.params.nameFile+".") != -1) {
              var namePath = files[i].split("/");
              fs.createReadStream(files[i]).pipe(fs.createWriteStream(_this.params.nameFile+"Export/"+namePath[namePath.length-1]));
            }
          }
          fstream.Reader({ 'path': _this.params.nameFile+"Export", 'type': 'Directory' })
          .pipe(tar.Pack()) /* Convert the directory to a .tar file */
          .pipe(zlib.Gzip()) /* Compress the .tar file */
          .pipe(fstream.Writer({ 'path': _this.params.nameFile+'Export.tar.gz' }));
      });
    });
  },
});

module.exports = ExportGenerator;