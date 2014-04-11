'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('underscore.string');


var GridelementsGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.dirs = {
      hooksDir: 'Classes/Hooks/',
      flexFormDir: 'Configuration/FlexForm/',
      tsConfigDir: 'Configuration/TSconfig/',
      tsDir: 'Configuration/Typoscript/',
      llDir: 'Resources/Private/Language/',
      jsDir: 'Resources/Public/js/',
      cssDir: 'Resources/Public/css/',
      imgDir: 'Resources/Public/img/',
      iconsDir: 'Resources/Public/Icons/'
    }

    // Check defaults files
    this._checkDefaultFiles();
  },

  askFor: function () {
    var done = this.async();
    var prompts = [
    {
      name: 'contentName',
      message: "What's the name of your content element?",
      default: 'custom'
    },
    {
      name: 'contentDescription',
      message: 'Provide a short description!'
    },
    {
      type: 'list',
      name: 'action',
      message: 'Content element type:',
      choices: [
        { value:'custom', name:'Create a custom content element' },
        // new yeoman.inquirer.Separator(),
        { value:'clickToPlay', name:'Based on Click to Play Youtube video' },
        { value:'imageCaption', name:'Based on Image Caption' },
        { value:'slideshow', name:'Based on Slideshow' },
        { value:'full', name:'Full content element' },
        // { value:'empty', name:'Empty content element' },
        new yeoman.inquirer.Separator(),
        { value:'exit', name:'Exit' },
      ]
    }];

    this.prompt(prompts, function (props) {
      this.params = {
        contentName: props.contentName,
        slugifiedContentName:  _.camelize(_.slugify(props.contentName)),
        contentDescription: props.contentDescription,
        action: props.action,
        customLines: []
      }
      done();
    }.bind(this));
  },

  switchAction: function() {
    this.params.slug =  this.params.slugifiedContentName;
    switch(this.params.action) {
      case 'clickToPlay':
        this._copyClickToPlay();
        break;
      case 'imageCaption':
        this._copyImageCaption();
        break;
      case 'slideshow':
        this._copySlideshowCaption();
        break;
      case 'full':
        this._copyFull();
        break;
      case 'empty':
        // this._copyEmpty();
        break;
      case 'custom':
        this._initCustom();
        break;
    }
  },

  _checkDefaultFiles: function() {
    this.currentDir = path.basename(process.env.PWD);
    if(!fs.existsSync('ext_localconf.php')) {
      this.template('_ext_localconf.php', 'ext_localconf.php');
    }
    if(!fs.existsSync('ext_typoscript_setup.txt')) {
      this.template('_ext_typoscript_setup.txt', 'ext_typoscript_setup.txt');
    }
    if(!fs.existsSync('ext_emconf.php')) {
      this.template('_ext_emconf.php', 'ext_emconf.php');
    }
  },

  _copyClickToPlay: function() {
    // upload directory
    this.createDir = true;

    // Copy files
    this.template(this.dirs.flexFormDir+'_clickToPlay.xml', this.dirs.flexFormDir+this.params.slug+'.xml');
    this.template(this.dirs.tsConfigDir+'_clickToPlay.ts', this.dirs.tsConfigDir+this.params.slug+'.ts');
    this.template(this.dirs.tsDir+'_clickToPlay.ts', this.dirs.tsDir+this.params.slug+'.ts');
    this.template(this.dirs.llDir+'_clickToPlay.xlf', this.dirs.llDir+this.params.slug+'.xlf');
    this.template(this.dirs.llDir+'_fr.clickToPlay.xlf', this.dirs.llDir+'fr.'+this.params.slug+'.xlf');
    this.template(this.dirs.cssDir+'_clickToPlay.css', this.dirs.cssDir+this.params.slug+'.css');
    this.copy(this.dirs.iconsDir+'_clickToPlay.gif', this.dirs.iconsDir+this.params.slug+'.gif');
    this.template(this.dirs.jsDir+'_clickToPlay.js', this.dirs.jsDir+this.params.slug+'.js');

    // Fill extension files
    this._fillConfFiles();
  },

  _copyImageCaption: function() {
    // upload directory
    this.createDir = true;

    // Copy files
    this.template(this.dirs.flexFormDir+'_imageCaption.xml', this.dirs.flexFormDir+this.params.slug+'.xml');
    this.template(this.dirs.tsConfigDir+'_imageCaption.ts', this.dirs.tsConfigDir+this.params.slug+'.ts');
    this.template(this.dirs.tsDir+'_imageCaption.ts', this.dirs.tsDir+this.params.slug+'.ts');
    this.template(this.dirs.llDir+'_imageCaption.xlf', this.dirs.llDir+this.params.slug+'.xlf');
    this.template(this.dirs.llDir+'_fr.imageCaption.xlf', this.dirs.llDir+'fr.'+this.params.slug+'.xlf');
    this.template(this.dirs.cssDir+'_imageCaption.css', this.dirs.cssDir+this.params.slug+'.css');
    this.copy(this.dirs.iconsDir+'_imageCaption.gif', this.dirs.iconsDir+this.params.slug+'.gif');

    // Fill extension files
    this._fillConfFiles();
  },

  _copyFull: function() {
    // upload directory
    this.createDir = true;

    // Copy files
    this.template(this.dirs.flexFormDir+'_full.xml', this.dirs.flexFormDir+this.params.slug+'.xml');
    this.template(this.dirs.tsConfigDir+'_full.ts', this.dirs.tsConfigDir+this.params.slug+'.ts');
    this.template(this.dirs.tsDir+'_full.ts', this.dirs.tsDir+this.params.slug+'.ts');
    this.template(this.dirs.llDir+'_full.xlf', this.dirs.llDir+this.params.slug+'.xlf');
    this.template(this.dirs.llDir+'_fr.full.xlf', this.dirs.llDir+'fr.'+this.params.slug+'.xlf');
    this.template(this.dirs.cssDir+'_full.css', this.dirs.cssDir+this.params.slug+'.css');
    this.copy(this.dirs.iconsDir+'_empty.gif', this.dirs.iconsDir+this.params.slug+'.gif');
    this.template(this.dirs.jsDir+'_full.js', this.dirs.jsDir+this.params.slug+'.js');

    // Fill extension files
    this._fillConfFiles();
  },

  _copySlideshowCaption: function() {
    // upload directory
    this.createDir = true;

    // Copy files
    this.template(this.dirs.flexFormDir+'_slideshow.xml', this.dirs.flexFormDir+this.params.slug+'.xml');
    this.template(this.dirs.tsConfigDir+'_slideshow.ts', this.dirs.tsConfigDir+this.params.slug+'.ts');
    this.template(this.dirs.tsDir+'_slideshow.ts', this.dirs.tsDir+this.params.slug+'.ts');
    this.template(this.dirs.llDir+'_slideshow.xlf', this.dirs.llDir+this.params.slug+'.xlf');
    this.template(this.dirs.llDir+'_fr.slideshow.xlf', this.dirs.llDir+'fr.'+this.params.slug+'.xlf');
    this.template(this.dirs.cssDir+'_slideshow.css', this.dirs.cssDir+this.params.slug+'.css');
    this.copy(this.dirs.cssDir+'fonts/slick.eot', this.dirs.cssDir+'fonts/slick.eot');
    this.copy(this.dirs.cssDir+'fonts/slick.svg', this.dirs.cssDir+'fonts/slick.svg');
    this.copy(this.dirs.cssDir+'fonts/slick.ttf', this.dirs.cssDir+'fonts/slick.ttf');
    this.copy(this.dirs.cssDir+'fonts/slick.woff', this.dirs.cssDir+'fonts/slick.woff');
    this.copy(this.dirs.iconsDir+'_slideshow.gif', this.dirs.iconsDir+this.params.slug+'.gif');
    this.copy(this.dirs.imgDir+'ajax-loader.gif', this.dirs.imgDir+'ajax-loader.gif');
    this.template(this.dirs.jsDir+'_slideshow.js', this.dirs.jsDir+this.params.slug+'.js');
    this.copy(this.dirs.jsDir+'slick.min.js', this.dirs.jsDir+'slick.min.js');

    // Fill extension files
    this._fillConfFiles();
  },

  _fillConfFiles:function () {
    // configuration include
    var ext_localconf = this.readFileAsString('ext_localconf.php');
    ext_localconf = ext_localconf.replace("// ## insert here", "// # "+this.params.contentName+"\n \\TYPO3\\CMS\\Core\\Utility\\ExtensionManagementUtility::addPageTSConfig('<INCLUDE_TYPOSCRIPT: source=\"FILE:EXT:"+this.currentDir+"/Configuration/TSconfig/"+this.params.slugifiedContentName+".ts\">');\n // ## insert here");
    this.write('ext_localconf.php',ext_localconf);

    // typoscript include
    var ext_typoscript_setup = this.readFileAsString('ext_typoscript_setup.txt');
    ext_typoscript_setup = ext_typoscript_setup.replace("## // insert here", "# // "+this.params.contentName+"\n<INCLUDE_TYPOSCRIPT: source=\"FILE:EXT:"+this.currentDir+"/Configuration/Typoscript/"+this.params.slugifiedContentName+".ts\">\n## // insert here");
    this.write('ext_typoscript_setup.txt',ext_typoscript_setup);

    // upload directory if needed
    if (this.createDir) {
      var ext_emconf = this.readFileAsString('ext_emconf.php');
      var matches = ext_emconf.match(/'createDirs' => '([a-zA-Z0-9,\/ ]*)'/g)
      if (matches) {
        if(matches[0].length < 30) {
          ext_emconf = ext_emconf.replace(/'createDirs' => '([a-zA-Z0-9,\/ ]*)'/g,  "'createDirs' => 'uploads/skinFlex/"+this.params.slugifiedContentName+"/'");
        }else {
          ext_emconf = ext_emconf.replace(/'createDirs' => '([a-zA-Z0-9,\/ ]*)'/g,  "'createDirs' => '$1, uploads/skinFlex/"+this.params.slugifiedContentName+"/'");
        }

        this.write('ext_emconf.php',ext_emconf);
      }
    }
  },

  _initCustom: function() {
    var tabField = new Array();
    this._promptCustom(tabField);
  },

  _promptCustom: function(tab) {
    var done = this.async();
    var prompts = [
    {
      name: "customField",
      message: "New field ?",
      type: 'list',
      choices: [
        { value:'input', name:'Input' },
        { value:'textarea', name:'Textarea' },
        { value:'rte', name:'Textarea with RTE' },
        { value:'image', name:'Image' },
        { value:'loop', name:'Loop' },
        new yeoman.inquirer.Separator(),
        { value:'exit', name:'Exit' },
      ]
    }
    ];

    this.prompt(prompts, function (props) {
      if(props.customField == 'exit'){
        console.log("exit");
        this._endCustom(tab);
      }else{
        var field = {
          type: props.customField,
          name: "",
          contentDescription: ""
        }
        this._promptField(props.customField, tab, field);
      }
      done();
    }.bind(this));
  },

  _promptField: function(type, tab, field) {
    var done = this.async();
    var prompts = [
      {
        name: 'fieldName',
        message: "What's the name of your "+type+"?",
        default: 'fieldcustom'
      },
      {
        name: 'fieldDescription',
        message: 'Provide a short description!'
      }
    ];

    this.prompt(prompts, function (props) {
      field.name = props.fieldName;
      field.contentDescription = props.fieldDescription;
      tab.push(field);
      this._promptCustom(tab);
      done();
    }.bind(this));
  },

  _createInput: function() {
    console.log("Input");
  },

  _createTextarea: function() {
    console.log("Textarea");
  },

  _createRte: function() {
    console.log("Textarea with RTE");
  },

  _createImage: function() {
    console.log("Image");
  },

  _createLoop: function() {
    console.log("Loop");
  },

_switchField: function(field) {
      switch(field.type) {
        case 'input':
          this._createInput();
          break;
        case 'textarea':
          this._createTextarea();
          break;
        case 'rte':
          this._createRte();
          break;
        case 'image':
          this._createImage();
          break;
        case 'loop':
          this._createLoop();
          break;
      }
  },

  _endCustom: function(tab) {
    for(var i=0; i<tab.length; i++)
      this._switchField(tab[i]);
  }
});

module.exports = GridelementsGenerator;
