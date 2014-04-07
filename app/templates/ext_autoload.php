<?php
$extensionClassesPath = t3lib_extMgm::extPath('skinFlex') . 'Classes/';

return array(
  'Inouit\skinFlex\Hooks\DrawItem' => $extensionClassesPath . 'Hooks/DrawItem.php',
  'Inouit\skinFlex\Hooks\CObj' => $extensionClassesPath . 'Hooks/CObj.php',
  'Inouit\skinFlex\Hooks\GetData' => $extensionClassesPath . 'Hooks/GetData.php',
);