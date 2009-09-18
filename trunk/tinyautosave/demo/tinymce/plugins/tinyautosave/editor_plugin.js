/*
	TinyAutoSave 2.0.1 (September 18, 2009) plugin for TinyMCE
	http://tinyautosave.googlecode.com/
	Copyright (c) 2008-2009 Todd Northrop
	http://www.speednet.biz/
	Licensed under GPL 3, see  <http://www.gnu.org/licenses/>
*/
(function(){var f="2.0.1",a="tinyautosave",C=false,y=false,z=false,n={"%":"%1","&":"%2",";":"%3","=":"%4","<":"%5"},D={"%1":"%","%2":"&","%3":";","%4":"=","%5":"<"},i=[],r={},l="TinyAutoSave_Test_",b=null,o={dataKey:"TinyAutoSave",cookieFilter:null,saveDelegate:null,saveFinalDelegate:null,restoreDelegate:null,disposeDelegate:null,restoreImage:"",progressImage:"progress.gif",intervalSeconds:60,retentionMinutes:20,minSaveLength:50,canRestore:false,busy:false,timer:null};try{localStorage.setItem(l,"OK");if(localStorage.getItem(l)==="OK"){localStorage.removeItem(l);C=true}}catch(w){try{sessionStorage.setItem(l,"OK");if(sessionStorage.getItem(l)==="OK"){sessionStorage.removeItem(l);y=true}}catch(w){z=tinymce.isIE}}tinymce.PluginManager.requireLangPack(a);tinymce.create("tinymce.plugins.TinyAutoSavePlugin",{editor:null,url:"",key:"",onPreSave:null,onPostSave:null,onSaveError:null,onPreRestore:null,onPostRestore:null,onRestoreError:null,showSaveProgress:true,progressDisplayTime:1200,init:function(e,E){var F=this,H=tinymce.is,K=tinymce.resolve,G,J,I;if(z){if(!b){b=e.getElement()}b.style.behavior="url('#default#userData')"}F.editor=e;F.id=e.id;F.url=E;F.key=e.getParam(a+"_key",e.id);G=B(F);G.restoreImage=E+"/images/restore."+(tinymce.isIE6?"gif":"png");F.setProgressImage(E+"/images/"+o.progressImage);G.intervalSeconds=Math.max(1,parseInt(e.getParam(a+"_interval_seconds",null)||e.getParam(a+"_interval",G.intervalSeconds)));G.retentionMinutes=Math.max(1,parseInt(e.getParam(a+"_retention_minutes",null)||e.getParam(a+"_retention",G.retentionMinutes)));G.minSaveLength=Math.max(1,parseInt(e.getParam(a+"_minlength",G.minSaveLength)));F.showSaveProgress=e.getParam(a+"_showsaveprogress",F.showSaveProgress);G.canRestore=F.hasSavedContent();G.saveDelegate=m(F,u);G.saveFinalDelegate=m(F,h);G.restoreDelegate=m(F,t);e.addCommand("mceTinyAutoSave",G.saveDelegate);e.addCommand("mceTinyAutoSaveRestore",G.restoreDelegate);e.addButton(a,{title:a+".restore_content",cmd:"mceTinyAutoSaveRestore",image:G.restoreImage});G.timer=window.setInterval(G.saveDelegate,G.intervalSeconds*1000);tinymce.dom.Event.add(window,"unload",G.saveFinalDelegate);e.onRemove.add(G.saveFinalDelegate);e.onPostRender.add(function(M,L){M.controlManager.setDisabled(a,!G.canRestore)});J=e.getParam(a+"_oninit",null);if(H(J,"string")){I=K(J);if(H(I,"function")){I.apply(F)}}},getInfo:function(){return{longname:"TinyAutoSave",author:"Speednet",authorurl:"http://www.speednet.biz/",infourl:"http://tinyautosave.googlecode.com/",version:f}},clear:function(){var E=this,e=E.editor,F=d(E);if(C){localStorage.removeItem(F.dataKey)}else{if(y){sessionStorage.removeItem(F.dataKey)}else{if(z){x(E)}else{tinymce.util.Cookie.remove(F.dataKey)}}}F.canRestore=false;e.controlManager.setDisabled(a,E)},hasSavedContent:function(){var G=this,H=d(G),E=new Date(),I,F;try{if(C||y){I=((C?localStorage.getItem(H.dataKey):sessionStorage.getItem(H.dataKey))||"").toString(),F=I.indexOf(",");if((F>8)&&(F<I.length-1)){if((new Date(I.slice(0,F)))>E){return true}if(C){localStorage.removeItem(H.dataKey)}else{sessionStorage.removeItem(H.dataKey)}}return false}else{if(z){return((k(G)||"").length>0)}}return((tinymce.util.Cookie.get(H.dataKey)||"").length>0)}catch(J){return false}},setProgressImage:function(e){if(tinymce.is(e,"string")){c(d(this).progressImage=e)}}});function A(){var e=this,E=d(e);if(E.timer){window.clearInterval(E.timer)}tinymce.dom.Event.remove(window,"unload",E.saveFinalDelegate);e.editor.onRemove.remove(E.saveFinalDelegate);j(e)}function h(){var e=d(this);e.saveDelegate();e.disposeDelegate()}function u(){var Q=this,J=Q.editor,R=d(Q),I=tinymce.is,F=J.execCallback,P=false,E=new Date(),L,G,N,M,O,H;if((J)&&(!R.busy)){R.busy=true;if(I(Q.onPreSave,"string")){if(!F(Q.onPreSave)){R.busy=false;return false}}L=J.getContent();if(I(L,"string")&&(L.length>=R.minSaveLength)){G=new Date(E.getTime()+(R.retentionMinutes*60*1000));try{if(C){localStorage.setItem(R.dataKey,G.toString()+","+g(L))}else{if(y){sessionStorage.setItem(R.dataKey,G.toString()+","+g(L))}else{if(z){q(Q,L,G)}else{N=R.dataKey+"=";M="; expires="+G.toUTCString();document.cookie=N+s(L).slice(0,4096-N.length-M.length)+M}}}P=true}catch(K){if(I(Q.onSaveError,"string")){F(Q.onSaveError)}}if(P){O=J.controlManager;R.canRestore=true;O.setDisabled(a,false);if(Q.showSaveProgress){M=tinymce.DOM.get(O.get(a).id);H=R.restoreImage;M.firstChild.src=R.progressImage;window.setTimeout(function(){M.firstChild.src=H},Math.min(Q.progressDisplayTime,R.intervalSeconds*1000-100))}if(I(Q.onPostSave,"string")){F(Q.onPostSave)}}}R.busy=false}return P}function t(){var L=this,I=L.editor,M=d(L),K=null,H=tinymce.is,E=I.execCallback,G,F;if((I)&&(M.canRestore)&&(!M.busy)){M.busy=true;if(H(L.onPreRestore,"string")){if(!E(L.onPreRestore)){M.busy=false;return}}try{if(C||y){K=((C?localStorage.getItem(M.dataKey):sessionStorage.getItem(M.dataKey))||"").toString();G=K.indexOf(",");if(G==-1){K=null}else{K=p(K.slice(G+1,K.length))}}else{if(z){K=k(L)}else{F=M.cookieFilter.exec(document.cookie);if(F){K=v(F[1])}}}if(!H(K,"string")){I.windowManager.alert(a+".no_content")}else{if(I.getContent().replace(/\s|&nbsp;|<\/?p[^>]*>|<br[^>]*>/gi,"").length===0){I.setContent(K);if(H(L.onPostRestore,"string")){E(L.onPostRestore)}}else{I.windowManager.confirm(a+".warning_message",function(e){if(e){I.setContent(K);if(H(L.onPostRestore,"string")){E(L.onPostRestore)}}M.busy=false},L)}}}catch(J){if(H(L.onRestoreError,"string")){E(L.onRestoreError)}}M.busy=false}}function q(e,F,E){b.setAttribute(d(e).dataKey,F);b.expires=E.toUTCString();b.save("TinyMCE")}function k(e){b.load("TinyMCE");return b.getAttribute(d(e).dataKey)}function x(e){b.removeAttribute(d(e).dataKey)}function s(e){return e.replace(/[\x00-\x1f]+|&nbsp;|&#160;/gi," ").replace(/(.)\1{5,}|[%&;=<]/g,function(E){if(E.length>1){return("%0"+E.charAt(0)+E.length.toString()+"%")}return n[E]})}function v(e){return e.replace(/%[1-5]|%0(.)(\d+)%/g,function(J,E,I){var G,H,F;if(J.length==2){return D[J]}for(G=[],H=0,F=parseInt(I);H<F;H++){G.push(E)}return G.join("")})}function g(e){return e.replace(/,/g,"&#44;")}function p(e){return e.replace(/&#44;/g,",")}function c(E){var e=i.length;i[e]=new Image();i[e].src=E}function m(e,E){return function(){return E.apply(e)}}function B(F){var e=F.key,E=r[e];if(!E){E=r[e]=tinymce.extend({},o,{dataKey:o.dataKey+e,saveDelegate:m(F,u),saveFinalDelegate:m(F,h),restoreDelegate:m(F,t),disposeDelegate:m(F,A),cookieFilter:new RegExp("(?:^|;\\s*)"+o.dataKey+e+"=([^;]*)(?:;|$)","i")})}return E}function d(e){return r[e.key]}function j(e){delete r[e.key]}tinymce.PluginManager.add(a,tinymce.plugins.TinyAutoSavePlugin)})();