webpackJsonp([0],{"23/c":function(t,n,e){"use strict";n.data=function(){return{commandInprogress:!1,overlayComponent:"Console",menuHidden:!0,logs:[]}},n.methods={performCommand:function(t){this.$socket.emit("client:perform",{command:t}),this.logs.push("$ "+t),this.showConsole(!0),this.commandInprogress=!0},showConsole:function(t){this.overlayComponent=t?"Console":"Menu",this.menuHidden=t},clearConsole:function(){this.logs=[]}},n.created=function(){var t=this;this.$socket.on("command",function(n){if(1==n.status)t.logs.push(n.result);else if(0==n.status)t.logs.push(n.error.message);else{t.commandInprogress=!1;var e=setInterval(function(){clearInterval(e),t.$socket.emit("client:status",null)},1e3)}}),this.$socket.on("history",function(n){1==n.status&&n.result.forEach(function(n){t.logs.push(n.message)})}),this.$socket.emit("client:history",null)}},"2TBi":function(t,n){},COBk:function(t,n,e){"use strict";n.data=function(){return{message:"Initializing...",component:"Splash"}},n.computed={onLogin:function(){return"Login"==this.component},onEmpty:function(){return""==this.component}},n.methods={handleAuthResponse:function(t,n){t?this.requestStatusCheck():this.message=n},requestStatusCheck:function(){this.$socket.emit("client:status",null)}},n.mounted=function(){var t=this,n=setInterval(function(){0==t.$root.isLoggedIn?t.$root.connected?(clearInterval(n),t.component="Login",t.message=""):t.message="Server not responding...":(clearInterval(n),t.requestStatusCheck())},1e3)}},FqfT:function(t,n){},LLb9:function(t,n){},MqTn:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("7+uW"),o={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("transition",{attrs:{name:"slide",mode:"out-in"}},[n("router-view")],1)],1)},staticRenderFns:[]};var i=e("VU/8")({name:"App",created:function(){0==this.$root.isLoggedIn&&this.$root._router.push("/")}},o,!1,function(t){e("2TBi")},null,null).exports,a=e("/ocq"),r=e("COBk"),c=e("C/JF"),l=e("fhbW"),u={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",[n("div",{staticClass:"animation"},[this._v(this._s(this.message))])])},staticRenderFns:[]};var d=e("VU/8")({name:"Splash",props:["message"]},u,!1,function(t){e("MqTn")},"data-v-7dfe688f",null).exports,p=e("jTjE");c.library.add(l.h);var m={name:"Login",props:["message"],data:p.data,methods:p.methods,mounted:p.mounted},v={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"loginBox"}},[e("div",{staticClass:"input"},[e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{type:"text",name:"username",placeholder:"Username"},domProps:{value:t.username},on:{input:function(n){n.target.composing||(t.username=n.target.value)}}})]),t._v(" "),e("div",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",name:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(n){n.target.composing||(t.password=n.target.value)}}})]),t._v(" "),e("div",[e("div",{staticClass:"button noselect",on:{click:t.signIn}},[t._v("Sign in")])]),t._v(" "),e("div",[t._v(t._s(t.message)+" ")])])])},staticRenderFns:[]};var h=e("VU/8")(m,v,!1,function(t){e("oFL3")},"data-v-9595acea",null).exports;c.library.add(l.h);var f={name:"Main",components:{Login:h,Splash:d},data:r.data,computed:r.computed,methods:r.methods,mounted:r.mounted},g={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"wrapper"}},[n("div",{staticClass:"title",class:{"title-login":this.onLogin,"title-empty":this.onEmpty}},[n("font-awesome-icon",{attrs:{icon:"robot"}}),n("br"),this._v("Raspbot\n  ")],1),this._v(" "),n("transition",{attrs:{name:"slide-up"}},[n(this.component,{tag:"component",attrs:{message:this.message},on:{handleAuthResponse:this.handleAuthResponse}})],1)],1)},staticRenderFns:[]};var _=e("VU/8")(f,g,!1,function(t){e("plUm")},"data-v-7542002e",null).exports,$=e("23/c");c.library.add(l.i,l.b,l.c,l.f,l.g,l.e);var w={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("section",{staticClass:"container"},[e("div",{attrs:{id:"updateMenu"}},[e("div",{on:{click:function(n){t.$emit("showConsole",!0)}}},[e("span",[e("font-awesome-icon",{attrs:{icon:"terminal"}}),e("br"),t._v("Show Console")],1)]),t._v(" "),e("div",{staticClass:"grouped"},[e("div",{class:{inactive:t.commandInprogress},on:{click:function(n){t.call("update")}}},[e("span",[e("font-awesome-icon",{attrs:{icon:"cloud-download-alt"}}),e("br"),t._v("Update")],1)]),t._v(" "),e("div",{class:{inactive:t.commandInprogress},on:{click:function(n){t.call("install")}}},[e("span",[e("font-awesome-icon",{attrs:{icon:"cog"}}),e("br"),t._v("Install")],1)])]),t._v(" "),e("div",{staticClass:"grouped"},[e("div",{class:{inactive:t.commandInprogress},on:{click:function(n){t.call("restart")}}},[e("span",[e("font-awesome-icon",{attrs:{icon:"redo-alt"}}),e("br"),t._v("(Re)start")],1)]),t._v(" "),e("div",{class:{inactive:t.commandInprogress},on:{click:function(n){t.call("stop")}}},[e("span",[e("font-awesome-icon",{attrs:{icon:"plug"}}),e("br"),t._v("Stop")],1)])]),t._v(" "),e("div",{class:{inactive:t.commandInprogress},on:{click:function(n){t.call("shutdown")}}},[e("span",[e("font-awesome-icon",{attrs:{icon:"power-off"}}),e("br"),t._v("Exit Updater")],1)])])])},staticRenderFns:[]};var k=e("VU/8")({name:"Menu",props:["commandInprogress"],methods:{call:function(t){this.commandInprogress||this.$emit("call",t)}}},w,!1,function(t){e("u/Oq")},"data-v-1c8e22cf",null).exports;c.library.add(l.d,l.a);var C={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"console"}},[e("div",{attrs:{id:"panel"}},[e("div",{on:{click:function(n){t.$emit("showConsole",!1)}}},[e("span",[e("font-awesome-icon",{attrs:{icon:"caret-square-down"}}),e("br"),t._v("Show menu")],1)]),t._v(" "),e("div",{on:{click:function(n){t.$emit("clearConsole")}}},[e("span",[e("font-awesome-icon",{attrs:{icon:"minus-square"}}),e("br"),t._v("Clear console")],1)])]),t._v(" "),e("div",{attrs:{id:"output"}},[t._l(t.logs,function(n){return e("pre",[t._v(t._s(n))])}),t._v(" "),t.commandInprogress?t._e():e("pre",{attrs:{id:"cursor"}},[t._v("$ "),e("span",{staticClass:"animation"},[t._v("_")])])],2),t._v(" "),e("div",{attrs:{id:"footer"}},[e("div",[t._v(t._s(this.$Application.appName)+" "+t._s(this.$Application.version)+": "),e("span",{class:t.status},[t._v(t._s(t.status))])])])])},staticRenderFns:[]};var I={name:"ConsoleMain",components:{Menu:k,Console:e("VU/8")({name:"Console",props:["logs","commandInprogress"],watch:{logs:function(t,n){this.$nextTick(function(){this.$el.scrollTop=this.$el.scrollHeight})},commandInprogress:function(t,n){0==t&&this.$nextTick(function(){this.$el.scrollTop=this.$el.scrollHeight})}},computed:{status:function(){return this.$root.serverStatus?"running":"stopped"}}},C,!1,function(t){e("LLb9")},"data-v-1ff612e3",null).exports},data:$.data,methods:$.methods,created:$.created},b={render:function(){var t=this.$createElement,n=this._self._c||t;return n("section",{attrs:{id:"container"}},[n("transition",{attrs:{name:"slide-menu"}},[n(this.overlayComponent,{tag:"component",attrs:{commandInprogress:this.commandInprogress,logs:this.logs},on:{call:this.performCommand,showConsole:this.showConsole,clearConsole:this.clearConsole}})],1)],1)},staticRenderFns:[]};var y=e("VU/8")(I,b,!1,function(t){e("FqfT")},"data-v-56e72c6a",null).exports;s.a.use(a.a);var L=new a.a({mode:"history",routes:[{path:"/",name:"Main",component:_},{path:"/login",name:"Login",component:h},{path:"/console",name:"ConsoleMain",component:y}]}),x=e("K/Lq"),S=e.n(x),A=e("OjAK"),R=e.n(A),q={install:function(t){t.prototype.$Application={appName:R.a.name,version:R.a.version}}},E=e("hMcO"),F=e.n(E),T=e("U0v6");s.a.use(S.a),s.a.use(q),s.a.use(F.a,":5001"),s.a.component("font-awesome-icon",T.FontAwesomeIcon),s.a.config.productionTip=!1,new s.a({el:"#app",router:L,components:{App:i},template:"<App/>",data:function(){return{isLoggedIn:!1,serverStatus:!1,connected:!0}},methods:{authenticate:function(t,n,e){var s=this,o={username:t,password:n};this.$socket.emit("authentication",o),this.$socket.on("authenticated",function(){s.$cookie.set("username",t,{expires:"1Y"}),s.$cookie.set("password",n,{expires:"1Y"}),s.isLoggedIn=!0,"function"==typeof e&&e(!0,null)}),this.$socket.on("unauthorized",function(t){"function"==typeof e&&e(!1,t.message)})}},created:function(){var t=this;this.$socket.on("status",function(n){t.serverStatus=n.running,"/console"!=t.$route.path&&t._router.push("/console")}),this.$socket.on("connect",function(){t.connected=!0}),this.$socket.on("disconnect",function(){t.isLoggedIn=!1,t.serverStatus=!1,t.connected=!1,t._router.push("/")});var n=this.$cookie.get("username"),e=this.$cookie.get("password");void 0==n&&null==n||this.authenticate(n,e)}})},OjAK:function(t,n){t.exports={name:"raspy",version:"0.2.1",description:"Raspy lets you control your Raspberry Pi.",author:"Ardalan Samimi <ardalan@saturnfive.se>",license:"AGPL-3.0",private:!0,repository:{type:"git",url:"https://github.com/pkrll/raspy"},scripts:{install:"npm run install_client && npm run install_server",install_client:"cd client && npm install",install_server:"cd server && npm install",dev_server:"cd server && npm run dev",dev_client:"cd client && npm run dev",setup:"cd server && npm run setup",build:"cd client && npm run build",patch:"node .scripts/increment-version.js --version=patch --skip-build",minor:"node .scripts/increment-version.js --version=minor --skip-build --reset-patch",major:"node .scripts/increment-version.js --version=major --skip-build --reset-minor --reset-patch"}}},jTjE:function(t,n,e){"use strict";n.data=function(){return{username:"",password:""}},n.methods={signIn:function(){var t=this;this.$root.authenticate(this.username,this.password,function(n,e){t.$emit("handleAuthResponse",n,e)})}},n.mounted=function(){}},oFL3:function(t,n){},plUm:function(t,n){},"u/Oq":function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.a7b170f4c43381aca71e.js.map