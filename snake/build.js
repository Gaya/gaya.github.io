!function(t){function e(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return t[a].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="/assets",e(0)}([function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}function r(t){l=t}function i(t){r(o({},l,(0,c.update)({timestamp:t,state:l}))),(0,c.draw)({timestamp:t,state:l,canvas:f}),window.requestAnimationFrame(i)}var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},s=n(1),u=a(s),c=n(2),d=n(3),l={},f=(0,u.default)(d.GAME_WIDTH*d.GAME_SCALE,d.GAME_HEIGHT*d.GAME_SCALE);window.focus(),r((0,c.setup)({state:l})),i()},function(t,e){"use strict";function n(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:600,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:600,n=document.createElement("canvas");return n.setAttribute("width",t),n.setAttribute("height",e),document.body.appendChild(n),n.getContext("2d")}function a(){return this.context}function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:600,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:600,r={context:n(t,e),getContext:a};return r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}function r(t){var e=t.state,n=void 0===e?{}:e;return(0,m.listenToInput)(),s({},n,c.setup,v.setup,(0,g.setup)(n,u.GAME_WIDTH,u.GAME_HEIGHT),l.setup,{input:(0,m.inputState)().input})}function i(t){var e=t.timestamp,n=void 0===e?0:e,a=t.state,r=void 0===a?{}:a,i=s({},r,(0,m.inputState)({timestamp:n,state:r}));return[c.update,d.update,l.update,v.update,g.update].map(function(t){return Object.assign({},t({timestamp:n,state:i}))}).reduce(function(t,e){return Object.assign({},t,e)})}function o(t){var e=t.timestamp,n=void 0===e?0:e,a=t.state,r=void 0===a?{}:a,i=t.canvas,o=void 0===i?null:i;[d.draw,l.draw,p.default,v.draw,g.draw].forEach(function(t){return t({timestamp:n,state:r,canvas:o})})}Object.defineProperty(e,"__esModule",{value:!0});var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.setup=r,e.update=i,e.draw=o;var u=n(3),c=n(4),d=n(5),l=n(6),f=n(7),p=a(f),v=n(8),g=n(12),m=n(13)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.GAME_WIDTH=30,e.GAME_HEIGHT=30,e.GAME_SCALE=10},function(t,e,n){"use strict";function a(t){var e=t.state;return e.game.started&&e.input.pause?{game:r({},e.game,{paused:!e.game.paused})}:{}}Object.defineProperty(e,"__esModule",{value:!0}),e.setup=void 0;var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.update=a;var i=n(3);e.setup={game:{started:!1,paused:!1,width:i.GAME_WIDTH,height:i.GAME_HEIGHT,scale:i.GAME_SCALE}}},function(t,e){"use strict";function n(){return{}}function a(t){var e=t.state,n=void 0===e?{game:{width:60,height:60}}:e,a=t.canvas,r=void 0===a?null:a,i=r.getContext();i.fillStyle=n.snake.dead?"red":"black",i.fillRect(0,0,n.game.width*n.game.scale,n.game.height*n.game.scale)}Object.defineProperty(e,"__esModule",{value:!0}),e.update=n,e.draw=a},function(t,e){"use strict";function n(t){var e=t.timestamp,n=t.state,a=void 0===n?{}:n;return e-a.startScreen.prevCheck<100?a.startScreen:a.input.space?{game:r({},a.game,{started:!0})}:{startScreen:{prevCheck:e,colour:i[Math.floor(Math.random()*e)%i.length]}}}function a(t){var e=t.state,n=void 0===e?o:e,a=t.canvas,r=void 0===a?null:a;if(!n.game.started){var i=r.getContext();i.fillStyle=n.startScreen.colour,i.textBaseline="top",i.font="48px monospace",i.fillText("Snake",50,50),i.font="14px monospace",i.fillText('press "space" to play',52,100),i.fillText("use arrow keys to move",52,130),i.fillText('press "p" to pause game',52,160)}}Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.update=n,e.draw=a;var i=["#FF4E50","#FC913A","#F9D423","#EDE574","#E1F5C4"],o=e.setup={startScreen:{prevCheck:0,colour:i[0]}}},function(t,e,n){"use strict";function a(t){var e=t.state,n=void 0===e?{}:e,a=t.canvas,i=void 0===a?null:a;if(n.game.started){var o=i.getContext();o.fillStyle="white",o.textBaseline="top",o.textAlign="right",o.font="14px monospace",o.fillText(10*(n.snake.tail.length-1),r.GAME_WIDTH*r.GAME_SCALE-3,3)}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=a;var r=n(3)},function(t,e,n){"use strict";function a(t,e){return{position:{x:e.x+t.x,y:e.y+t.y}}}function r(t,e){return e.filter(function(e){return(0,p.isSame)(t,e)}).length>0}function i(t){var e={};return t.input.up&&!(0,p.isSame)(t.snake.dir,f.DOWN)?e={dir:f.UP}:t.input.down&&!(0,p.isSame)(t.snake.dir,f.UP)?e={dir:f.DOWN}:t.input.left&&!(0,p.isSame)(t.snake.dir,f.RIGHT)?e={dir:f.LEFT}:t.input.right&&!(0,p.isSame)(t.snake.dir,f.LEFT)&&(e={dir:f.RIGHT}),e}function o(t){return.9+.05*t.tail.length}function s(t){return 100/o(t)}function u(t){var e=t.timestamp,n=t.state,o=void 0===n?{}:n;if(!o.game.started)return{};var u=l({},o.snake);return!o.game.paused&&!o.snake.dead&&e-s(o.snake)>o.snake.prevTick&&(u.prevTick=e,u=l({},u,i(o)),u=l({},u,a(o.snake.dir,o.snake.position)),(u.position.x<0||u.position.x>=o.game.width||u.position.y<0||u.position.y>=o.game.height||r(u.position,o.snake.tail))&&(u=l({},o.snake,{dead:!0})),u.dead||((0,g.snakeTouchesFood)(u,o.food)?u=l({},u,{tail:o.snake.tail.concat(o.snake.position)}):o.snake.tail.length>0&&(u=l({},u,{tail:o.snake.tail.slice(1,o.snake.tail.length).concat(o.snake.position)})))),{snake:l({},u)}}function c(t,e){return function(n){t.fillRect((0,v.scaledPosition)(n.x,e),(0,v.scaledPosition)(n.y,e),e,e)}}function d(t){var e=t.state,n=void 0===e?m:e,a=t.canvas,r=void 0===a?null:a;if(n.game.started){var i=r.getContext();i.fillStyle="white",c(i,n.game.scale)(n.snake.position),n.snake.tail.forEach(c(i,n.game.scale))}}Object.defineProperty(e,"__esModule",{value:!0}),e.setup=void 0;var l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.update=u,e.draw=d;var f=n(9),p=n(10),v=n(11),g=n(12),m=e.setup={snake:{prevTick:0,dead:!1,position:{x:1,y:1},tail:[{x:0,y:1}],dir:f.RIGHT}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.UP={x:0,y:-1},e.DOWN={x:0,y:1},e.LEFT={x:-1,y:0},e.RIGHT={x:1,y:0},e.UP_KEY=38,e.DOWN_KEY=40,e.LEFT_KEY=37,e.RIGHT_KEY=39},function(t,e){"use strict";function n(t,e){return JSON.stringify(t)===JSON.stringify(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.isSame=n,e.default=n},function(t,e){"use strict";function n(t,e){return t*e}Object.defineProperty(e,"__esModule",{value:!0}),e.scaledPosition=n,e.default=n},function(t,e,n){"use strict";function a(t,e,n){return!e||!n||(t.position.x===e&&t.position.y===n||t.tail.filter(function(t){return t.x===e&&t.y===n}).length>0)}function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l.setup.snake,e=arguments[1],n=arguments[2],r=null,i=null;do r=Math.floor(Math.random()*e),i=Math.floor(Math.random()*n);while(a(t,r,i));return{x:r,y:i}}function i(t,e){return t.position.x===e.x&&t.position.y===e.y}function o(t,e,n){return{food:r(t.snake,e,n)}}function s(t){var e=t.state,n=void 0===e?{}:e;if(!n.game.started)return{};var a=c({},n.food);return i(n.snake,n.food)&&(a=r(n.snake,n.game.width,n.game.height)),{food:a}}function u(t){var e=t.state,n=void 0===e?o:e,a=t.canvas,r=void 0===a?null:a;if(n.game.started){var i=r.getContext();i.fillStyle="red",i.fillRect((0,d.scaledPosition)(n.food.x,n.game.scale),(0,d.scaledPosition)(n.food.y,n.game.scale),n.game.scale,n.game.scale)}}Object.defineProperty(e,"__esModule",{value:!0});var c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.snakeTouchesFood=i,e.setup=o,e.update=s,e.draw=u;var d=n(11),l=n(8)},function(t,e,n){"use strict";function a(t){return{up:t===s.UP_KEY,down:t===s.DOWN_KEY,left:t===s.LEFT_KEY,right:t===s.RIGHT_KEY,space:t===u.SPACE_KEY,pause:t===u.PAUSE_KEY,keyCode:t}}function r(){return{input:c}}function i(t){return t[t.length-1]}function o(){c=a({},null),window.addEventListener("keydown",function(t){d=d.filter(function(e){return e!==t.keyCode}).concat(t.keyCode),c=a(i(d))}),window.addEventListener("keyup",function(t){d=d.filter(function(e){return e!==t.keyCode}),c=a(i(d))})}Object.defineProperty(e,"__esModule",{value:!0}),e.inputStateByKeyCode=a,e.inputState=r,e.listenToInput=o;var s=n(9),u=n(14),c={},d=[]},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SPACE_KEY=32,e.PAUSE_KEY=80}]);