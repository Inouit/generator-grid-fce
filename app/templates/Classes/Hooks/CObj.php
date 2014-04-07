<?php
namespace Inouit\skinFlex\Hooks;

/**
 * This Hook is heavely based on the wec_contentelements hook. I've just implemented 6.2 compatibility and change some varriables name for, in my humble opinion, easiest understanding
 */
class CObj implements \TYPO3\CMS\Frontend\ContentObject\ContentObjectGetSingleHookInterface {

  protected $cObj;

  /**
   * Renders a single cObject, returning its output.
   *
   * @param string    $contentObjectName: The name of the cObject.
   * @param array   $configuration: The Typoscript configuration.
   * @param string    $TypoScriptKey: The key assigned to the cObject.
   * @param tslib_ccObj $parentObject: Back reference to parent cObject.
   * @return  string
   */
  public function getSingleContentObject($contentObjectName, array $configuration, $TypoScriptKey, \TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer &$parentObject) {
    $this->cObj =& $parentObject;
    switch($contentObjectName) {
      case 'FLEXFORM_SECTION':
        $content = $this->FLEXFORM_SECTION($configuration);
        break;
    }

    return $content;
  }



  /**
   * Iterates over a flexform section, returning the combined output of all
   * elements within the specified section.
   *
   * @param array $conf: The TypoScript configuration.
   * @return  string
   *
   */
  public function FLEXFORM_SECTION(array $conf) {
    $sectionArray = $this->cObj->getData($conf['rootPath'], $this->cObj->data);
    $content = '';
    if ($this->cObj->checkIf($conf['if.'])) {
      $counter = 1;
      foreach ($sectionArray as $index => $section) {
        $GLOBALS['TSFE']->register['FFSECTION_COUNTER'] = $counter++;
        $this->cObj->sectionRootPath = $conf['rootPath'] . '/' . $index;
        $content .= $this->cObj->cObjGet($conf);
      }

      if ($conf['wrap']) {
        $content = $this->cObj->wrap($content, $conf['wrap']);
      }
      if ($conf['stdWrap.']) {
        $content = $this->cObj->stdWrap($content, $conf['stdWrap.']);
      }
    }

    return $content;
  }


}