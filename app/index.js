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
        new yeoman.inquirer.Separator(),
        { value:'clickToPlay', name:'Based on Click to Play Youtube video' },
        { value:'imageCaption', name:'Based on Image Caption' },
        { value:'slideshow', name:'Based on Slideshow' },
        { value:'full', name:'Full content element' },
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

  _initCustom: function() {
    // copy default files
    this.template(this.dirs.flexFormDir+'_custom.xml', this.dirs.flexFormDir+this.params.slug+'.xml');
    this.template(this.dirs.tsConfigDir+'_custom.ts', this.dirs.tsConfigDir+this.params.slug+'.ts');
    this.template(this.dirs.tsDir+'_custom.ts', this.dirs.tsDir+this.params.slug+'.ts');
    this.template(this.dirs.llDir+'_custom.xlf', this.dirs.llDir+this.params.slug+'.xlf');
    this.template(this.dirs.llDir+'_fr.custom.xlf', this.dirs.llDir+'fr.'+this.params.slug+'.xlf');
    this.copy(this.dirs.iconsDir+'_empty.gif', this.dirs.iconsDir+this.params.slug+'.gif');

    var _this = this;
    this.conflicter.resolve(function (err) {
      _this.files = {
        typoscript: _this.readFileAsString(_this.dirs.tsDir+_this.params.slug+'.ts'),
        flexform: _this.readFileAsString(_this.dirs.flexFormDir+_this.params.slug+'.xml'),
        language: _this.readFileAsString(_this.dirs.llDir+_this.params.slug+'.xlf'),
        languageFr: _this.readFileAsString(_this.dirs.llDir+'fr.'+_this.params.slug+'.xlf')
      };
      _this.tabField = new Array();
      _this._promptCustom();
    });
  },

  _promptCustom: function() {
    var done = this.async();
    var prompts = [
    {
      name: "customField",
      message: "Do you want another item?",
      type: 'list',
      choices: [
        { value:'input', name:'Input' },
        { value:'textarea', name:'Textarea' },
        { value:'rte', name:'Textarea with RTE' },
        { value:'image', name:'Image' },
        { value:'loop', name:'Loop' },
        new yeoman.inquirer.Separator(),
        { value:'exit', name:'No thanks, that\'s enough.' },
      ]
    }
    ];

    this.prompt(prompts, function (props) {
      if(props.customField == 'exit'){
        this._endCustom();
      }else{
        this._promptField(props);
      }
      done();
    }.bind(this));
  },

  _promptField: function(p) {
    var done = this.async();
    var prompts = [
      {
        name: 'fieldName',
        message: "What's the name of your "+p.customField+"?",
      },
      {
        name: 'fieldDescription',
        message: 'Provide a short description!'
      }
    ];

    this.prompt(prompts, function (props) {
      var field = {
          type: p.customField,
          name: _.camelize(_.slugify(props.fieldName)),
          contentDescription: props.fieldDescription
      }
      this.tabField.push(field);
      this._promptCustom();
      done();
    }.bind(this));
  },

  _createInput: function(cpt, field, loopName) {
    var index =cpt*10;
    if(loopName) {
      var dataPath = 'data = section_item:'+loopName+'/el/'+field.name;
      var tab = '        ';
      var tabFlex = '            ';
    }else {
      var dataPath = 'field = flexform_'+field.name;
      var tab = tabFlex = '    ';
    }

    this.files.typoscript = this.files.typoscript.replace("## // insert here", index+" = TEXT\n"+tab+index+" {\n"+tab+"  "+dataPath+"\n"+tab+"}\n\n"+tab+"## // insert here");
    this.files.flexform = this.files.flexform.replace("<!-- insert here -->", "<"+field.name+">\n"+tabFlex+"        <TCEforms>\n"+tabFlex+"          <label>LLL:EXT:"+this.currentDir+"/"+this.dirs.llDir+this.params.slugifiedContentName+".xlf:flexform."+this.params.slugifiedContentName+"."+field.name+"</label>\n"+tabFlex+"          <config>\n"+tabFlex+"            <type>input</type>\n"+tabFlex+"          </config>\n"+tabFlex+"        </TCEforms>\n"+tabFlex+"      </"+field.name+">\n\n"+tabFlex+"      <!-- insert here -->");
    this.files.language = this.files.language.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve">\n'+tab+'    <source>'+field.contentDescription+'</source>\n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
    this.files.languageFr = this.files.languageFr.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve" approved="yes"> \n'+tab+'    <source>'+field.contentDescription+'</source> \n'+tab+'    <target state="translated">'+field.contentDescription+'</target> \n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
  },

  _createTextarea: function(cpt, field, loopName) {
    var index =cpt*10;
    if(loopName) {
      var dataPath = 'data = section_item:'+loopName+'/el/'+field.name;
      var tab = '        ';
      var tabFlex = '            ';
    }else {
      var dataPath = 'field = flexform_'+field.name;
      var tab = tabFlex = '    ';
    }

    this.files.typoscript = this.files.typoscript.replace("## // insert here", index+" = TEXT\n"+tab+index+" {\n"+tab+"  "+dataPath+"\n"+tab+"}\n\n"+tab+"## // insert here");
    this.files.flexform = this.files.flexform.replace("<!-- insert here -->", "<"+field.name+">\n"+tabFlex+"        <TCEforms>\n"+tabFlex+"          <label>LLL:EXT:"+this.currentDir+"/"+this.dirs.llDir+this.params.slugifiedContentName+".xlf:flexform."+this.params.slugifiedContentName+"."+field.name+"</label>\n"+tabFlex+"          <config>\n"+tabFlex+"            <type>text</type>\n"+tabFlex+"            <cols>50</cols>\n"+tabFlex+"            <rows>5</rows>\n"+tabFlex+"          </config>\n"+tabFlex+"        </TCEforms>\n"+tabFlex+"      </"+field.name+">\n\n"+tabFlex+"      <!-- insert here -->");
    this.files.language = this.files.language.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve">\n'+tab+'    <source>'+field.contentDescription+'</source>\n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
    this.files.languageFr = this.files.languageFr.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve" approved="yes"> \n'+tab+'    <source>'+field.contentDescription+'</source> \n'+tab+'    <target state="translated">'+field.contentDescription+'</target> \n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
  },

  _createRte: function(cpt, field, loopName) {
    var index =cpt*10;
    if(loopName) {
      var dataPath = 'data = section_item:'+loopName+'/el/'+field.name;
      var tab = '        ';
      var tabFlex = '            ';
    }else {
      var dataPath = 'field = flexform_'+field.name;
      var tab = tabFlex = '    ';
    }

    this.files.typoscript = this.files.typoscript.replace("## // insert here", index+" = TEXT\n"+tab+index+" {\n"+tab+"  "+dataPath+"\n"+tab+"  stdWrap.parseFunc < lib.parseFunc_RTE\n"+tab+"}\n\n"+tab+"## // insert here");
    this.files.flexform = this.files.flexform.replace("<!-- insert here -->", "<"+field.name+">\n"+tabFlex+"        <TCEforms>\n"+tabFlex+"          <label>LLL:EXT:"+this.currentDir+"/"+this.dirs.llDir+this.params.slugifiedContentName+".xlf:flexform."+this.params.slugifiedContentName+"."+field.name+"</label>\n"+tabFlex+"          <config>\n"+tabFlex+"            <type>text</type>\n"+tabFlex+"            <cols>50</cols>\n"+tabFlex+"            <rows>5</rows>\n"+tabFlex+"          </config>\n"+tabFlex+"          <defaultExtras>richtext[*]:rte_transform[mode=ts_css]</defaultExtras>\n"+tabFlex+"        </TCEforms>\n"+tabFlex+"      </"+field.name+">\n\n"+tabFlex+"      <!-- insert here -->");
    this.files.language = this.files.language.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve">\n'+tab+'    <source>'+field.contentDescription+'</source>\n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
    this.files.languageFr = this.files.languageFr.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve" approved="yes"> \n'+tab+'    <source>'+field.contentDescription+'</source> \n'+tab+'    <target state="translated">'+field.contentDescription+'</target> \n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
  },

  _createImage: function(cpt, field, loopName) {
    this.createDir = true;
    var index =cpt*10;
    if(loopName) {
      var dataPath = 'data = section_item:'+loopName+'/el/'+field.name;
      var tab = '        ';
      var tabFlex = '            ';
    }else {
      var dataPath = 'field = flexform_'+field.name;
      var tab = tabFlex = '    ';
    }

    this.createDir = true;
    this.files.typoscript = this.files.typoscript.replace("## // insert here", index+" = IMAGE\n"+tab+index+" {\n"+tab+"  file.import."+dataPath+"\n"+tab+"  file.import.wrap = uploads/"+this.currentDir+"/"+this.params.slugifiedContentName+"/\n"+tab+"}\n\n"+tab+"## // insert here");
    this.files.flexform = this.files.flexform.replace("<!-- insert here -->", "<"+field.name+">\n"+tabFlex+"        <TCEforms>\n"+tabFlex+"          <label>LLL:EXT:"+this.currentDir+"/"+this.dirs.llDir+this.params.slugifiedContentName+".xlf:flexform."+this.params.slugifiedContentName+"."+field.name+"</label>\n"+tabFlex+"          <config>\n"+tabFlex+"            <type>group</type>\n"+tabFlex+"            <internal_type>file</internal_type>\n"+tabFlex+"            <allowed>gif,jpg,jpeg,tif,bmp,pcx,tga,png,pdf,ai</allowed>\n"+tabFlex+"            <max_size>5000</max_size>\n"+tabFlex+"            <uploadfolder>uploads/"+this.currentDir+"/"+this.params.slugifiedContentName+"/</uploadfolder>\n"+tabFlex+"            <show_thumbs>1</show_thumbs>\n"+tabFlex+"            <maxitems>1</maxitems>\n"+tabFlex+"          </config>\n"+tabFlex+"        </TCEforms>\n"+tabFlex+"      </"+field.name+">\n\n"+tabFlex+"      <!-- insert here -->");
    this.files.language = this.files.language.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve">\n'+tab+'    <source>'+field.contentDescription+'</source>\n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
    this.files.languageFr = this.files.languageFr.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve" approved="yes"> \n'+tab+'    <source>'+field.contentDescription+'</source> \n'+tab+'    <target state="translated">'+field.contentDescription+'</target> \n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
  },

  _createLoop: function(cpt, field, loopName) {
    var index =cpt*10;
    var dataPath = 'data = section_item:'+loopName+'/el/'+field.name;
    var tab = '    ';
    // if(loopName) {
    //   var tab = '      ';
    // }else {
    // }

    this.files.typoscript = this.files.typoscript.replace("## // insert here", index+" = FLEXFORM_SECTION\n"+tab+index+" {\n"+tab+"  rootPath = section:"+field.name+"s/el\n\n"+tab+"  10 = COA\n"+tab+"  10 {\n"+tab+'    wrap = <div class="'+field.name+'">|</div>\n\n'+tab+"    ## // insert here\n"+tab+"  }\n\n"+tab+"}\n");
    this.files.flexform = this.files.flexform.replace("<!-- insert here -->", "<"+field.name+"s>\n"+tab+"        <section>1</section>\n"+tab+"        <type>array</type>\n"+tab+"        <el>\n"+tab+"          <"+field.name+">\n"+tab+"            <type>array</type>\n"+tab+"            <tx_templavoila>\n"+tab+"              <title>LLL:EXT:"+this.currentDir+"/"+this.dirs.llDir+this.params.slugifiedContentName+".xlf:flexform."+this.params.slugifiedContentName+"."+field.name+"</title>\n"+tab+"            </tx_templavoila>\n"+tab+"            <el>\n"+tab+"              <!-- insert here -->\n"+tab+"            </el>\n"+tab+"          </"+field.name+">\n"+tab+"        </el>\n"+tab+"      </"+field.name+"s>\n");
    this.files.language = this.files.language.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve">\n'+tab+'    <source>'+field.contentDescription+'</source>\n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
    this.files.languageFr = this.files.languageFr.replace("<!-- insert here -->", '<trans-unit id="flexform.'+this.params.slugifiedContentName+'.'+field.name+'" xml:space="preserve" approved="yes"> \n'+tab+'    <source>'+field.contentDescription+'</source> \n'+tab+'    <target state="translated">'+field.contentDescription+'</target> \n'+tab+'  </trans-unit>\n\n'+tab+'  <!-- insert here -->');
  },

  _endCustom: function() {
    var loopName = false;
    var index = 0;
    for(var i=0; i<this.tabField.length; i++) {
      index ++;
      var field = this.tabField[i];
      switch(this.tabField[i].type) {
        case 'input':
          this._createInput(index, field, loopName);
          break;
        case 'textarea':
          this._createTextarea(index, field, loopName);
          break;
        case 'rte':
          this._createRte(index, field, loopName);
          break;
        case 'image':
          this._createImage(index, field, loopName);
          break;
        case 'loop':
          this._createLoop(index, field, loopName);
          loopName = field.name;
          index = 0;
          break;
      }
    }

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

    // custom configuration include
    if(this.files && this.files.typoscript) {
      this.write(this.dirs.tsDir+this.params.slug+".ts", this.files.typoscript);
    }
    if(this.files && this.files.flexform) {
      this.write(this.dirs.flexFormDir+this.params.slug+".xml", this.files.flexform);
    }
    if(this.files && this.files.language) {
      this.write(this.dirs.llDir+this.params.slug+".xlf", this.files.language);
    }
    if(this.files && this.files.languageFr) {
      this.write(this.dirs.llDir+"fr."+this.params.slug+".xlf", this.files.languageFr);
    }

    // upload directory if needed
    if (this.createDir) {
      var ext_emconf = this.readFileAsString('ext_emconf.php');
      var matches = ext_emconf.match(/'createDirs' => '([a-zA-Z0-9,\/ ]*)'/g)
      if (matches) {
        if(matches[0].length < 30) {
          ext_emconf = ext_emconf.replace(/'createDirs' => '([a-zA-Z0-9,\/ ]*)'/g,  "'createDirs' => 'uploads/"+this.currentDir+"/"+this.params.slugifiedContentName+"/'");
        }else {
          ext_emconf = ext_emconf.replace(/'createDirs' => '([a-zA-Z0-9,\/ ]*)'/g,  "'createDirs' => '$1, uploads/"+this.currentDir+"/"+this.params.slugifiedContentName+"/'");
        }

        this.write('ext_emconf.php',ext_emconf);
      }
    }
  },
});

module.exports = GridelementsGenerator;
