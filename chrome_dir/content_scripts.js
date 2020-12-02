(()=>{"use strict";var t={3:(t,n)=>{Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(){this.storage=chrome.storage.sync}return t.getInstance=function(){return t.instance||(t.instance=new t),t.instance},t.prototype.getAsync=function(t,n){this.storage.get((function(r){var e=r[t];n&&n(e)}))},t.prototype.setAsync=function(t,n,r){var e={};e[t]=n,this.storage.set(e,(function(){return r&&r(t,n)}))},t}();n.default=r.getInstance()},419:(t,n,r)=>{Object.defineProperty(n,"__esModule",{value:!0});var e=r(3),o=function(){function t(){var n=this;this.config={password:"123456",autoFill:!1},e.default.getAsync(t.KEY,(function(t){return n.config=t||{}}))}return t.prototype.initialize=function(){this.changePassword("123456")},t.prototype.changePassword=function(n){this.config.password=n,e.default.setAsync(t.KEY,this.config)},t.prototype.getPassword=function(){return this.config.password},t.prototype.changeAutoFill=function(n){this.config.autoFill=n,e.default.setAsync(t.KEY,this.config)},t.prototype.getAutoFill=function(){return!!this.config.autoFill},t.getInstance=function(){return null==t.INSTANCE&&(t.INSTANCE=new t),t.INSTANCE},t.KEY="__CryptorConfig__",t}();n.default=o.getInstance()},12:(t,n,r)=>{Object.defineProperty(n,"__esModule",{value:!0});var e=r(873),o=r(419),i=function(){function t(){this.cryptor=new e.default}return t.prototype.support=function(){return o.default.getAutoFill()},t.prototype.handle=function(){var t=this.cryptor;$(":input").filter("textarea, input").focus((function(){var n=$(this),r=n.val()?n.val().toString():"";r&&n.val(t.decrypt(r.toString()))})).blur((function(){var n=$(this),r=n.val()?n.val().toString():"";r&&n.val(t.encrypt(r))}))},t}();n.default=i},873:(t,n,r)=>{Object.defineProperty(n,"__esModule",{value:!0});var e=r(419),o=function(){function t(){this.version="01",this.prefix="z"+this.version,this.prefixL=this.prefix.length}return t.prototype.encrypt=function(t){return this.prefix+this.ring(t)},t.prototype.decrypt=function(t){return t&&t.startsWith(this.prefix)?this.ring(t.substring(this.prefixL)):t},t.prototype.ring=function(t){var n=this.getPasswordNumber();return this.toUnicodeArray(t).map((function(t){return t^n})).map((function(t){return String.fromCharCode(t)})).join("")},t.prototype.getPasswordNumber=function(){var t=0,n=e.default.getPassword();return this.toUnicodeArray(n).forEach((function(n){return t^=n})),t},t.prototype.toUnicodeArray=function(t){for(var n=[],r=0;r<t.length;r++)n.push(t.charCodeAt(r));return n},t}();n.default=o},265:(t,n,r)=>{var e=r(12),o=[];o.push(new e.default),o.forEach((function(t){t.support(window.location.host,window.location.href)&&t.handle()}))}},n={};!function r(e){if(n[e])return n[e].exports;var o=n[e]={exports:{}};return t[e](o,o.exports,r),o.exports}(265)})();