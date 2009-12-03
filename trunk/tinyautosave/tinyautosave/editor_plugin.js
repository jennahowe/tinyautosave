/*
	TinyAutoSave 2.1.1 (December 3, 2009) plugin for TinyMCE
	http://tinyautosave.googlecode.com/
	Copyright (c) 2008-2009 Todd Northrop
	http://www.speednet.biz/
	Licensed under GPL 3, see  <http://www.gnu.org/licenses/>
*/
(function(){var r="function",f="string",i="unload",d=true,q="OK",t="TinyAutoSave",b=null,a=false,M="2.1.1",c="tinyautosave",h=a,n=a,l=a,E={"%":"%1","&":"%2",";":"%3","=":"%4","<":"%5"},D={"%1":"%","%2":"&","%3":";","%4":"=","%5":"<"},s=[],o={},u={},m="TinyAutoSave_Test_",g=b,p={dataKey:t,cookieFilter:b,saveDelegate:b,saveFinalDelegate:b,restoreDelegate:b,disposeDelegate:b,restoreImage:"",progressImage:"progress.gif",intervalSeconds:60,retentionMinutes:20,minSaveLength:50,askBeforeUnload:a,canRestore:a,busy:a,timer:b};try{localStorage.setItem(m,q);if(localStorage.getItem(m)===q){localStorage.removeItem(m);h=d}}catch(A){try{sessionStorage.setItem(m,q);if(sessionStorage.getItem(m)===q){sessionStorage.removeItem(m);n=d}}catch(A){l=tinymce.isIE}}tinymce.PluginManager.requireLangPack(c);tinymce.create("tinymce.plugins.TinyAutoSavePlugin",{editor:b,url:"",key:"",onPreSave:b,onPostSave:b,onSaveError:b,onPreRestore:b,onPostRestore:b,onRestoreError:b,showSaveProgress:d,progressDisplayTime:1200,init:function(d,m){var h="mceTinyAutoSaveRestore",e=this,o=tinymce.is,q=tinymce.resolve,a,k,n;if(l){if(!g)g=d.getElement();g.style.behavior="url('#default#userData')"}e.editor=d;e.id=d.id;e.url=m;e.key=d.getParam(c+"_key",d.id);a=C(e);a.restoreImage=m+"/images/restore."+(tinymce.isIE6?"gif":"png");e.setProgressImage(m+"/images/"+p.progressImage);a.intervalSeconds=Math.max(1,parseInt(d.getParam(c+"_interval_seconds",b)||d.getParam(c+"_interval",a.intervalSeconds)));a.retentionMinutes=Math.max(1,parseInt(d.getParam(c+"_retention_minutes",b)||d.getParam(c+"_retention",a.retentionMinutes)));a.minSaveLength=Math.max(1,parseInt(d.getParam(c+"_minlength",a.minSaveLength)));e.showSaveProgress=d.getParam(c+"_showsaveprogress",e.showSaveProgress);a.askBeforeUnload=d.getParam(c+"_ask_beforeunload",a.askBeforeUnload);a.canRestore=e.hasSavedContent();a.saveDelegate=j(e,z);a.saveFinalDelegate=j(e,x);a.restoreDelegate=j(e,y);d.addCommand("mceTinyAutoSave",a.saveDelegate);d.addCommand(h,a.restoreDelegate);d.addButton(c,{title:c+".restore_content",cmd:h,image:a.restoreImage});a.timer=window.setInterval(a.saveDelegate,a.intervalSeconds*1e3);tinymce.dom.Event.add(window,i,a.saveFinalDelegate);d.onRemove.add(a.saveFinalDelegate);d.onPostRender.add(function(b){b.controlManager.setDisabled(c,!a.canRestore)});k=d.getParam(c+"_oninit",b);if(o(k,f)){n=q(k);o(n,r)&&n.apply(e)}a.askBeforeUnload&&tinymce.dom.Event.add(window,i,tinymce.plugins.AutoSavePlugin._beforeUnloadHandler)},getInfo:function(){return {longname:t,author:"Speednet",authorurl:"http://www.speednet.biz/",infourl:"http://tinyautosave.googlecode.com/",version:M}},clear:function(){var d=this,f=d.editor,b=e(d);if(h)localStorage.removeItem(b.dataKey);else if(n)sessionStorage.removeItem(b.dataKey);else if(l)F(d);else tinymce.util.Cookie.remove(b.dataKey);b.canRestore=a;f.controlManager.setDisabled(c,d)},hasSavedContent:function(){var g=this,b=e(g),i=new Date,c,f;try{if(h||n){c=((h?localStorage.getItem(b.dataKey):sessionStorage.getItem(b.dataKey))||"").toString(),f=c.indexOf(",");if(f>8&&f<c.length-1){if(new Date(c.slice(0,f))>i)return d;if(h)localStorage.removeItem(b.dataKey);else sessionStorage.removeItem(b.dataKey)}return a}else if(l)return (w(g)||"").length>0;return (tinymce.util.Cookie.get(b.dataKey)||"").length>0}catch(j){return a}},setProgressImage:function(a){tinymce.is(a,f)&&J(e(this).progressImage=a)},"static":{_beforeUnloadHandler:function(){var b;tinymce.each(tinyMCE.editors,function(c){if(c.getParam("fullscreen_is_enabled"))return;if(c.isDirty()){b=c.getLang("autosave.unload_msg");return a}});return b}}});function L(){var b=this,a=e(b);a.timer&&window.clearInterval(a.timer);tinymce.dom.Event.remove(window,i,a.saveFinalDelegate);a.askBeforeUnload&&tinymce.dom.Event.remove(window,i,tinymce.plugins.AutoSavePlugin._beforeUnloadHandler);b.editor.onRemove.remove(a.saveFinalDelegate);B(b)}function k(a){if(!a)return d;var c,b,e=tinymce.is;if(e(a,f)){c=u[a];if(c)b=c[a];else u[a]=b=tinymce.resolve(a)}else if(e(a,r))b=a;else return d;return b.apply(this)}function x(){var a=e(this);a.saveDelegate();a.disposeDelegate()}function z(){var g=this,q=g.editor,b=e(g),u=tinymce.is,o=a,t=new Date,i,m,r,j,p,s;if(q&&!b.busy){b.busy=d;i=q.getContent();if(u(i,f)&&i.length>=b.minSaveLength){if(!k.call(g,g.onPreSave)){b.busy=a;return a}m=new Date(t.getTime()+b.retentionMinutes*60*1e3);try{if(h)localStorage.setItem(b.dataKey,m.toString()+","+v(i));else if(n)sessionStorage.setItem(b.dataKey,m.toString()+","+v(i));else if(l)K(g,i,m);else{r=b.dataKey+"=";j="; expires="+m.toUTCString();document.cookie=r+I(i).slice(0,4096-r.length-j.length)+j}o=d}catch(w){k.call(g,g.onSaveError)}if(o){p=q.controlManager;b.canRestore=d;p.setDisabled(c,a);if(g.showSaveProgress){j=tinymce.DOM.get(p.get(c).id);if(j){s=b.restoreImage;j.firstChild.src=b.progressImage;window.setTimeout(function(){j.firstChild.src=s},Math.min(g.progressDisplayTime,b.intervalSeconds*1e3-100))}}k.call(g,g.onPostSave)}}b.busy=a}return o}function y(){var g=this,m=g.editor,j=e(g),i=b,q=tinymce.is,o,p;if(m&&j.canRestore&&!j.busy){j.busy=d;if(!k.call(g,g.onPreRestore)){j.busy=a;return}try{if(h||n){i=((h?localStorage.getItem(j.dataKey):sessionStorage.getItem(j.dataKey))||"").toString();o=i.indexOf(",");if(o==-1)i=b;else i=G(i.slice(o+1,i.length))}else if(l)i=w(g);else{p=j.cookieFilter.exec(document.cookie);if(p)i=H(p[1])}if(!q(i,f))m.windowManager.alert(c+".no_content");else if(m.getContent().replace(/\s|&nbsp;|<\/?p[^>]*>|<br[^>]*>/gi,"").length===0){m.setContent(i);k.call(g,g.onPostRestore)}else m.windowManager.confirm(c+".warning_message",function(b){if(b){m.setContent(i);k.call(g,g.onPostRestore)}j.busy=a},g)}catch(r){k.call(g,g.onRestoreError)}j.busy=a}}function K(a,c,b){g.setAttribute(e(a).dataKey,c);g.expires=b.toUTCString();g.save("TinyMCE")}function w(a){g.load("TinyMCE");return g.getAttribute(e(a).dataKey)}function F(a){g.removeAttribute(e(a).dataKey)}function I(a){return a.replace(/[\x00-\x1f]+|&nbsp;|&#160;/gi," ").replace(/(.)\1{5,}|[%&;=<]/g,function(a){if(a.length>1)return "%0"+a.charAt(0)+a.length.toString()+"%";return E[a]})}function H(a){return a.replace(/%[1-5]|%0(.)(\d+)%/g,function(c,f,e){var a,b,d;if(c.length==2)return D[c];for(a=[],b=0,d=parseInt(e);b<d;b++)a.push(f);return a.join("")})}function v(a){return a.replace(/,/g,"&#44;")}function G(a){return a.replace(/&#44;/g,",")}function J(b){var a=s.length;s[a]=new Image;s[a].src=b}function j(b,a){return function(){return a.apply(b)}}function C(a){var b=a.key,c=o[b];if(!c)c=o[b]=tinymce.extend({},p,{dataKey:p.dataKey+b,saveDelegate:j(a,z),saveFinalDelegate:j(a,x),restoreDelegate:j(a,y),disposeDelegate:j(a,L),cookieFilter:new RegExp("(?:^|;\\s*)"+p.dataKey+b+"=([^;]*)(?:;|$)","i")});return c}function e(a){return o[a.key]}function B(a){delete o[a.key]}tinymce.PluginManager.add(c,tinymce.plugins.TinyAutoSavePlugin)})();