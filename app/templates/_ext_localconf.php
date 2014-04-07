<?php
	$_EXTCONF = unserialize($_EXTCONF);

  // Hooks
  $GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects']['GridElementsTeam\Gridelements\Hooks\DrawItem'] = array(
    'className' => 'Inouit\<%= currentDir %>\Hooks\DrawItem',
  );
  $TYPO3_CONF_VARS['SC_OPTIONS']['tslib/class.tslib_content.php']['cObjTypeAndClassDefault'][] = 'Inouit\<%= currentDir %>\Hooks\CObj';
  $TYPO3_CONF_VARS['SC_OPTIONS']['tslib/class.tslib_content.php']['getData'][] = 'Inouit\<%= currentDir %>\Hooks\GetData';

  // ## insert here

?>