# generator-grid-fce

## Getting Started

### What is generator-grid-fce?

It's a [Yeoman][1] generator to create flexible content elements with gridelements in [Typo3][2] version 6.2 or higher

### Requirements ###
#### [Yeoman][3] ####
Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
$ npm install -g generator-grid-fce
```

#### [gridelements_fce][4] ####
In frontend typoscript configuration, the generator use gridelements_fce for building loop on flexform section

#### plugin configuration ####
It's a best practice to store your flex in a plugin or at least in your skin plugin. We just have some requirement for this plugin but if those files don't exist yet, the generator will create them for you.
**What do we need ?**
 - in **ext_emconf.php**, a `'createDirs' => ''` should be set. It'll be filled when one of your FCE need a upload directory
 - in **ext_localconf.php**, a `// ## insert here` comment for TSConfig insertion
 - in **ext_typoscript_setup.txt**, a `## // insert here` comment for Typoscript insertion


## Launch generator ##
Initiate the generator in the typo3 extension where you want to store  flexible content elements:

```
$ yo grid-fce
```

Follow instructions and build your own content element

**Choose the type of custom element**
```
[?] Content element type: (Use arrow keys)
‣ Based on Click to Play Youtube video  // -> Copy a "Click To play" element
  Based on Image Caption                // -> Copy a "Image Caption" element
  Based on Slideshow                    // -> Copy a "Slideshow" element
  Full content element                  // -> Copy a full element
  --------
  Exit                                  // -> I let you guess
```

##FCE screenshots##
                              |
:---------------------------: | :--------------------------:
**Click to play**<br />![][5] | **Image caption**<br >![][6]
**Slideshow**<br />![][7]     |

## License ##
GPL V3

  [1]: http://yeoman.io
  [2]: http://typo3.org/
  [3]: http://yeoman.io
  [4]: http://typo3.org/extensions/repository/view/gridelements
  [5]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/clickToPlay.jpg
  [6]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/imageCaption.jpg
  [7]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/slideshow.jpg