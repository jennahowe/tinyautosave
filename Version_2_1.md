# Version 2.1 release notes #

This release improves event handling in the TinyAutoSave plugin.

Changed files:

  * changelog.txt
  * tinyautosave/editor\_plugin.js
  * tinyautosave/editor\_plugin\_src.js
  * demo/demo.htm

## What's new ##

Fixed: onPreSave event no longer fires when editor does not contain the requisite number of characters to perform an autosave.

All callback functions can now be specified as either a string or function.  (Demo page updated to include an example of both methods.)

Minified source file now prepared with Microsoft Ajax Minifier, which currently produces the most compact JavaScript code.
http://aspnet.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=35893

## Download ##

You can grab version 2.1 on the [Downloads](http://code.google.com/p/tinyautosave/downloads/list) page.