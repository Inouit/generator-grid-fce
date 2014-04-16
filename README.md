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
It's a good practice to store all your flexible contents in a separated plugin or at least in your skin plugin.

--------------------------
#####**I don't have such a thing !**#####

Don't worry ! Create a directory in *localconf/ext/* and go inside it
Launch the generator and it'll make this directory a clean Typo3 plugin, ready to install.

--------------------------
#####**I have a skin plugin, what should I do?**#####
We just have some requirements in the configuration files of your plugin:

 - in **ext_emconf.php**, a `'createDirs' => ''` should be set. It'll be filled when one of your FCE need an upload directory
 - in **ext_localconf.php**, a `// ## insert here` comment for TSConfig insertion
 - in **ext_typoscript_setup.txt**, a `## // insert here` comment for Typoscript insertion


## Launch generator ##
Initiate the generator in the typo3 extension where flexible content elements will be stored:

```
$ yo grid-fce
```

Follow instructions and build your own content element

**Choose the type of custom element**
```
[?] Content element type: (Use arrow keys)
‣ Create a custom content element       // -> Create custom: field by field
  --------
  Based on Click to Play Youtube video  // -> Copy a "Click To play" element
  Based on Image Caption                // -> Copy a "Image Caption" element
  Based on Slideshow                    // -> Copy a "Slideshow" element
  Full content element                  // -> Copy a full element
  --------
  Exit                                  // -> I let you guess
```

**Loop on the custom fields you want to insert**
```
  [?] Do you want another item? (Use arrow keys)
  ‣ Input                                     // -> Insert an input field
  Textarea                                    // -> Insert an textarea field
  Textarea with RTE                           // -> Insert an textarea field with Wysiwyg configuration
  Image                                       // -> Insert an image field
  Loop                                        // -> Insert an loop configuration
  --------
  No thanks, that's enough.                   // -> Generate all fields that you've chosen before
```


##FCE screenshots example##
**Click to play**<br />![][5] | **Slideshow**<br />![][6]
:---------------------------: | :--------------------------:
**Image caption**<br >![][7] | **Custom: highlighted numbers**<br >![][8]
**Custom: blocks in columns**<br >![][9] | **Custom: slider with count**<br />![][10]

##Quick demo##
Here's a quick demo of a slideshow custom element  

![][12]

and the results  

```
# file : Configuration/Typoscript/slideshow.ts
page.includeCSS.slideshow = EXT:skinFlex/Resources/Public/css/slideshow.css

tt_content.gridelements_pi1.20.10.setup.slideshow {
  prepend = COA
  prepend {
    5 = < lib.stdheader
    10 = TEXT
    10 {
      field = flexform_title
    }
    20 = FLEXFORM_SECTION
    20 {
      rootPath = section:slides/el
      10 = COA
      10 {
        wrap = <div class="slide">|</div>
        10 = IMAGE
        10 {
          file.import.data = section_item:slide/el/image
          file.import.wrap = uploads/skinFlex/slideshow/
        }
        20 = TEXT
        20 {
          data = section_item:slide/el/caption
        }
        ## // insert here
      }
    }
  }
  outerWrap = <div class="slideshow">|</div>
}
```

## Thanks ##
Thanks to [Plou][13] and [JuJulien][11] for their help.

## License ##
GPL V3


  [1]: http://yeoman.io
  [2]: http://typo3.org/
  [3]: http://yeoman.io
  [4]: http://typo3.org/extensions/repository/view/gridelements_fce
  [5]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/clickToPlay.jpg
  [6]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/slideshow.jpg
  [7]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/imageCaption.jpg
  [8]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/custom-3.jpg
  [9]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/custom-1.jpg
  [10]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/custom-2.jpg
  [11]: https://github.com/JuJulien
  [12]: https://raw.githubusercontent.com/Inouit/generator-grid-fce/screenshots/screenshots/demo-custom.gif
  [13]: https://github.com/Plou
