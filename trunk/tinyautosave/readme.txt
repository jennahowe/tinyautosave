TinyAutoSave plug-in for TinyMCE
by Speednet

Automatically saves the editor contents periodically and just before
leaving the current page.  Allows the user to rescue the contents of
the last autosave, in case they did not intend to navigate away from
the current page or the browser window was closed before posting the
content.

Released under the terms of the GNU General Public License version 3.
See license.txt in the project root for details.

See changelog.txt for a summary of changes to the project.

TinyAutoSave project page:
http://code.google.com/p/tinyautosave/

See description of commands and options below.

About the Author
	Speednet is the owner and developer of Lottery Post, the world's
	largest community of lottery players and home to the world's #1
	lottery results service. (www.lotterypost.com)

-----------------------------------------
COMMANDS AND OPTIONS

TinyMCE Commands

	mceTinyAutoSaveRestore - Called when toolbar button is clicked.
		Restores the content currently in the auto-save storage.
			
	mceTinyAutoSave - Saves the current contents of the editor to the
		auto-save storage.  Within the plug-in, this command is
		executed in two ways: (1) with a timer that saves the contents
		periodically, and (2) when the current page is exited/closed.

		
Configuration Options

	tinyautosave_interval_seconds - (Number, default = 60) The number of
		seconds between automatic saves.  When the editor is first displayed,
		an autosave will not occur for at least this amount of time.

	tinyautosave_retention_minutes - (Number, default = 20) The number of
		minutes since the last autosave that content will remain in the
		rescue storage space before it is automatically expired.

	tinyautosave_minlength - (Number, default = 50) The minimum number of
		characters that must be in the editor before an autosave will occur.
		The character count includes all non-visible characters, such as HTML
		tags.  Although this can be set to 0 (zero), it is not recommended.
		Doing so would open the possibility that if the user accidentally
		refreshes the page, the empty editor contents would overwrite the
		rescue content, effectively defeating the purpose of the plugin.

	tinyautosave_showsaveprogress - (Boolean, default = true) When true, the
		toolbar button will show a brief animation every time an autosave
		occurs.



