(this["webpackJsonpgenshin-sheet"]=this["webpackJsonpgenshin-sheet"]||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t,a){},function(e,t,a){},,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(1),r=a.n(c),l=a(10),i=a.n(l),s=(a(27),a(28),a(29),{phys:"Phys. DMG (%)",ele:"Elemental DMG (%)",em:"Elemental Mastery",cr:"Crit Rate (%)",cd:"Crit DMG (%)",er:"Energy Recharge (%)",ATK:"ATK",ART_ATK:"+ATK",ART_HP:"+HP",ART_DEF:"+DEF",HP:"HP",DEF:"DEF",PATK:"%ATK",PDEF:"%DEF",PHP:"%HP",healb:"Healing Bonus (%)",Normal:"Normal Attack (%)",Charge:"Charge Attack (%)",Skill:"Ele. Skill DMG (%)",Burst:"Ele. Burst D.MG (%)",Total:"Total DMG (%)",ATKSPD:"Attack Speed (%)",CDR:"Cool Down (%)",MVSPD:"Movement Speed (%)",LVL:"LVL",Swirl:"Swirl DMG (%)",Overload:"Overload DMG (%)",Eletrocharge:"Eletrocharge DMG (%)",Superconduct:"Superconduct DMG (%)",Shattered:"Shattered DMG (%)",Melt:"Melt DMG (%)",Vaporize:"Vaporize DMG (%)",Crystalize:"Crystalize DMG (%)",None:"None"}),o=s.er,u=[s.cr,s.cd,s.er,s.em,s.PATK,s.PDEF,s.PHP],d=[s.em,s.PATK,s.PHP,s.PDEF],j=[s.ART_HP],b=[s.ART_ATK],f=[s.er].concat(d),h=[s.ele,s.phys].concat(d),O=[s.cr,s.cd,s.healb].concat(d),p=[s.None,s.phys].concat(u),m=[s.None].concat(u),x=[s.LVL,s.HP,s.ATK,s.DEF],y=[s.None,s.ele,s.phys,s.Skill,s.Burst,s.Normal,s.Charge,s.Total,s.MVSPD,s.ATKSPD].concat(u),v=[s.Swirl,s.Overload,s.Eletrocharge,s.Superconduct,s.Melt,s.Vaporize],g=[].concat(y).concat(v),T=[s.None,s.ART_HP,s.ART_ATK,s.ART_DEF].concat(u),_=Array.from(new Set(["None"].concat(T).concat(y))),N=(a(16),a(3)),S=a(6),w=function(e){return Math.trunc(100*e)/100},V=function(e){var t=function(e){var t=a(e)||0,n=a("%"+e)/100,c=a("+"+e)||0;return w(t*(1+n)+c)},a=function(t){return e[t]||0};return e.totalHP=t(s.HP),e.totalATK=t(s.ATK),e.totalDEF=t(s.DEF),e.totalCrit=Math.min(100,5+a(s.cr)),e.totalEM=a(s.em),e.totalCritDMG=50+a(s.cd),e.totalATKSPD=100+a(s.ATKSPD),e.totalRecharge=100+a(s.er),e},A=Object(S.b)({name:"stats",initialState:{},reducers:{calcDelta:function(e,t){var a=t.payload,n=a.oldType,c=a.oldValue,r=a.newType,l=a.newValue;n&&(e[n]=(e[n]||0)-(c||0)),e[r]=(e[r]||0)+(l||0);var i=V(e);for(var s in i)e[s]=i[s]},calcStats:function(e,t){var a=function(e){var t=function(e,t){return e?e+(t||0):t||0},a={},n={LVL:e.LVL,HP:e.HP,DEF:e.DEF,ATK:e.ATK},c=e.ascensionStatType,r=e.ascensionStatValue;for(var l in n)a[l]=t(a[l],n[l]);a[c]=t(a[c],r),Array(6).fill(0).forEach((function(n,c){for(var r="artifactTypes-".concat(c),l="artifactValues-".concat(c),i=e[r],s=e[l],o=0;i&&o<i.length;o++)a[i[o]]=t(a[i[o]],s[o])})),a[e.weaponSubstatType]=t(a[e.weaponSubstatType],e.weaponSubstatValue);for(var i=e.weaponPassivesType,s=e.weaponPassivesValue,o=0;i&&o<i.length;o++)a[i[o]]=t(a[i[o]],s[o]);var u=e.BuffType,d=e.BuffValue,j=e.BuffToggle;for(o=0;u&&o<u.length;o++)j[o]&&(a[u[o]]=t(a[u[o]],d[o]));return V(a)}(t.payload);for(var n in a)e[n]=a[n]}}}),D=A.actions,C=D.calcDelta,M=D.calcStats,E=function(e){return e.stats},P=A.reducer,B=function(){var e=Object(N.c)(E),t=e.totalHP,a=e.totalATK,c=e.totalDEF,r=e.totalCrit,l=e.totalCritDMG,i=e.totalATKSPD,o=e.totalRecharge,u=e.totalEM,d=function(t){return e[t]||0},j=w(a/(d(s.ATK)||1)*100),b=100*w(1-r/100+r/100*(1+l/100)),f=function(){for(var e=0,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];for(var c in a)e+=d(a[c]);return e},h={"P. Normal":100+f(s.Normal,s.Total,s.phys),"P. Charge":100+f(s.Charge,s.Total,s.phys),"E. Normal":100+f(s.Normal,s.Total,s.ele),"E. Charge":100+f(s.Charge,s.Total,s.ele),"E. Skill":100+f(s.Skill,s.Total,s.phys),"E. Burst":100+f(s.Burst,s.Total,s.phys)},O={"Total HP":t,"Total ATK":a,"Total DEF":c,"Elemental Mastery":u,"Critical Rate":"".concat(r,"%"),"Critical Damage":"".concat(l,"%"),"Attack Speed":"".concat(i,"%"),"Energy Recharge":"".concat(o,"%"),"":null,Multipliers:null,"ATK Multiplier":"".concat(j,"%"),"CRIT Multiplier":"".concat(b,"%")};return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)("table",{className:"table__table",children:Object(n.jsxs)("tbody",{children:[Object.keys(O).map((function(e,t){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{className:"table__td",children:e}),Object(n.jsx)("td",{className:"table__td",children:O[e]})]},t)})),Object(n.jsxs)("tr",{children:[Object(n.jsx)("th",{className:"table__th",children:"Attack Type"}),Object(n.jsx)("th",{className:"table__th"})]}),Object.keys(h).map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{className:"table__td",children:e}),Object(n.jsxs)("td",{className:"table__td",children:[h[e],"%"]})]},e)}))]})})})},R=a(2),F=function(e){return Object(n.jsx)("button",Object(R.a)({tabIndex:-1},e))},k=a(5),L=a(8),I=(a(36),a(37),function(e){var t=e.onChange,a=e.array,c=e.component,r=e.defaultValue;return Object(n.jsxs)("span",{children:[Object(n.jsxs)("select",{className:e.className||"element__selectField--default",tabIndex:-1,defaultValue:r,onChange:function(e){return t(e.target.value,!0)},children:[a.map((function(e){return Object(n.jsx)("option",{value:e,children:e},e)})),Object(n.jsx)("option",{hidden:!0,children:o})]}),c]})}),K=function(e,t){return void 0===e||null===e||0===e.localeCompare("None")?Object(n.jsx)(c.Fragment,{}):t},H=(a(38),function(e){return Object(n.jsx)("input",{className:e.className||"item__fillWidth",type:"number",defaultValue:void 0===e.defaultValue?"":e.defaultValue,onBlur:function(t){var a=parseFloat(t.target.value);e.onChange(isNaN(a)?null:a)}},e.defaultValue)}),G=function(e){return Object(n.jsxs)(n.Fragment,{children:[e.name," ",Object(n.jsx)(H,Object(R.a)({},e))]})},J=function(){var e={};return Array(5).fill(0).forEach((function(t,a){e["artifactTypes-".concat(a)]=Array(5).fill(null),e["artifactValues-".concat(a)]=Array(5).fill(0)})),e["artifactTypes-0"][0]=s.ART_HP,e["artifactTypes-1"][0]=s.ART_ATK,e["artifactTypes-2"][0]=s.er,e["artifactTypes-3"][0]=s.ele,e["artifactTypes-4"][0]=s.cr,e["artifactTypes-5"]=[],e["artifactValues-5"]=[],e}(),U=Object(R.a)(Object(R.a)(Object(R.a)(Object(R.a)(Object(R.a)({},{weaponSubstatType:"None",weaponPassivesType:[],weaponPassivesValue:[]}),{TalentName:[],DamageType:[],ReactionMultipliers:[],DamageValue:[],monsterLevelStr:0,monsterResStr:0,resReduction:0,defReduction:0}),{ascensionStatType:"None",ascensionStatValue:0,HP:"",LVL:"",ATK:"",DEF:""}),J),{BuffName:[],BuffType:[],BuffValue:[],BuffToggle:[]}),W="WeaponField",z=[W,"ArtifactField","CharacterField","DamageField"],Y=["None","Phys. Normal","Phys. Charge","Ele. Normal","Ele. Charge","Ele. Skill","Ele. Burst"],$=["Swirl","Overload","Electrocharge","Superconduct","Shattered"],q=function(e){var t=localStorage.getItem(e);try{var a=t?JSON.parse(t):{},n={currentSheet:e};return a.WeaponField?z.forEach((function(e){var t="undefined"!==a[e]?JSON.parse(a[e]):{};n=a[e]?Object(R.a)(Object(R.a)({},n),t):{}})):n=Object(R.a)({},a),n}catch(c){console.log(c)}},Q=Object(R.a)(Object(R.a)({},U),{},{currentSheet:"null",view:""}),X=Object(S.b)({name:"sheet",initialState:Object(R.a)(Object(R.a)({},Q),q("CharacterSheet1")),reducers:{updateSheet:function(e,t){for(var a in t.payload)e[a]=t.payload[a]},loadSheet:function(e,t){var a=Object(R.a)(Object(R.a)({},Q),t.payload);for(var n in a)e[n]=a[n]}}}),Z=X.actions,ee=Z.updateSheet,te=Z.loadSheet,ae=function(e){return e.sheet},ne=X.reducer,ce=a(7),re=function(e){return function(t,a,n){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];return function(l){var i={oldType:t,oldValue:a};Array.isArray(l)?(i.newType=t,i.newValue=l[c]):(i.newType=t,i.newValue=l),!Array.isArray(t)&&r&&e(C(i)),ie(e)(n)(l)}}},le=function(e){return function(t,a,n){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];return function(l){var i={oldType:t,oldValue:a};Array.isArray(l)?(i.newType=l[c],i.newValue=a):(i.newType=l,i.newValue=a),!Array.isArray(t)&&r&&e(C(i)),ie(e)(n)(l)}}},ie=function(e){return function(t){return function(a){e(ee(Object(k.a)({},t,a)))}}},se=function(e){return function(t,a,n){return function(t){e(ee(Object(k.a)({},n,t)))}}},oe=function(e,t,a){return function(n,c,r){return function(l){var i=Object(ce.a)(a[n]);i[c]=l,t.apply(void 0,Object(ce.a)(e.map((function(e){return a[e][c]}))).concat([n,c,r]))(i)}}},ue=function(e,t,a){return function(n){return function(c){t.apply(void 0,Object(ce.a)(e.map((function(e){return a[e]}))).concat([n]))(c)}}},de=a(19),je=a(21),be=a(20),fe=(a(39),function(e,t){return function(){var a=function(t,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0,c=t(a);c(e[a].concat(n))};t.forEach((function(e){a.apply(void 0,Object(ce.a)(e))}))}}),he=function(e,t){return function(a){var n=function(t,n,c){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){return function(){}},l=t(n),i=Object(ce.a)(e[n]);i.splice(a,1),r(n,a)(0),l(i)};t.forEach((function(e){n.apply(void 0,Object(ce.a)(e))}))}},Oe=function(e){Object(je.a)(a,e);var t=Object(be.a)(a);function a(e){var c;Object(de.a)(this,a),(c=t.call(this,e)).AddEffect=function(){var e=c.state.fieldIDArray;e.push(c.state.counter),c.setState({fieldIDArray:e,counter:c.state.counter+1}),c.props.addEffect()},c.RemoveEffect=function(e){var t=c.state.fieldIDArray;t.splice(e,1),c.setState({fieldIDArray:t}),c.props.removeEffect(e)},c.ComponentRenderer=function(e,t,a){return Object(n.jsx)("div",{children:Object(n.jsxs)("div",{className:c.props.wrapperClass||"section__MultiField--spacing",children:[Object(n.jsx)(a,{id:e,index:t}),Object(n.jsx)(F,{onClick:function(){return c.RemoveEffect(t)},children:"Remove"})]})},e)},c.render=function(){return Object(n.jsx)(n.Fragment,{children:c.props.children?r.a.cloneElement(c.props.children,{key:c.state.fieldIDArray.length,className:c.state.fieldIDArray.length>3?"section__MultiField--scrollView":"section__MultiField",array:c.state.fieldIDArray,remove:function(e){return Object(n.jsx)(F,{onClick:function(){return c.RemoveEffect(e)},children:"Remove"})},add:function(){return Object(n.jsx)(F,{onClick:function(){return c.AddEffect()},children:c.props.buttonText||"Add"})}}):Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{children:[c.props.title||"",Object(n.jsx)(F,{onClick:function(){return c.AddEffect()},children:c.props.buttonText||"Add"})]}),Object(n.jsx)("div",{className:c.state.fieldIDArray.length>3?"section__MultiField--scrollView":"section__MultiField",children:c.state.fieldIDArray?c.state.fieldIDArray.map((function(e,t){return c.ComponentRenderer(e,t,c.props.component)})):null},c.state.fieldIDArray.length)]})})};var l,i=c.props.initialLength||0;return l=Array(i).fill(0).map((function(e,t){return t})),c.state={fieldIDArray:l,counter:l.length},c}return a}(r.a.Component),pe="weaponPassivesType",me="weaponPassivesValue",xe="weaponSubstatType",ye="weaponSubstatValue",ve=function(e){return Object(n.jsx)("div",{style:{overflowY:"scroll",maxHeight:"178px",border:"1px solid white"},children:Object(n.jsxs)("table",{className:"table__table",children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[["Type","Value"].map((function(e,t){return Object(n.jsx)("th",{className:"table__th",children:e},t)})),Object(n.jsxs)("th",{children:[" ",e.add()," "]})]})}),Object(n.jsx)("tbody",{children:e.array.map((function(t,a){return ge({id:t,index:a,remove:e.remove})}))})]})})},ge=function(e){var t=e.id,a=e.index,c=e.remove,r=Object(N.b)(),l=Object(N.c)(ae),i=le(r),s=re(r),o=[pe,me],u=oe(o,s,l),d=oe(o,i,l),j=Object(n.jsx)(n.Fragment,{children:K(l.weaponPassivesType[a],Object(n.jsx)(H,{onChange:u(me,a),defaultValue:l.weaponPassivesValue[a]}))});return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:Object(n.jsx)(I,{selectionName:pe,onChange:d(pe,a),array:y,defaultValue:l.weaponPassivesType[a]})}),Object(n.jsx)("td",{children:j}),Object(n.jsx)("td",{children:c(a)})]},t)},Te=function(){var e=Object(R.a)({},Object(N.c)(ae)),t=Object(N.b)(),a=le(t),c=re(t),r=[pe,me],l=e.weaponPassivesType?e.weaponPassivesType.length:0,i=oe(r,c,e),s=ue(r,c,e),o=ue(r,a,e),u=[[s,pe],[o,me,0,i]],d=K(e.weaponSubstatType,Object(n.jsx)(G,{onChange:c(e.weaponSubstatType,e.weaponSubstatValue,ye),defaultValue:e.weaponSubstatValue}));return Object(n.jsxs)("div",{children:["Weapon Substat",Object(n.jsx)("table",{className:"table__table",children:Object(n.jsx)("tbody",{className:"table__td",children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:Object(n.jsx)(I,{array:p,onChange:a(e.weaponSubstatType,e.weaponSubstatValue,xe),defaultValue:e.weaponSubstatType})}),Object(n.jsx)("td",{children:d})]})})}),Object(n.jsx)(Oe,{initialLength:l,title:"Weapon Passive",buttonText:"Add Passive",component:ge,addEffect:fe(e,u),removeEffect:he(e,u),children:Object(n.jsx)(ve,{})})]})},_e=(a(40),function(){var e,t,a=Object(R.a)({},Object(N.c)(ae)),c=Object(N.b)(),r="ascensionStatType",l="ascensionStatValue",i=le(c),s=re(c),o=[r,l],u=ue(o,i,a),d=ue(o,s,a);return Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{children:" Base Stats "}),Object(n.jsx)("table",{className:"table__table item__fillWidth",children:Object(n.jsx)("tbody",{children:x.map((function(e,t){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{className:"table__td",children:e}),Object(n.jsx)("td",{className:"table__td",children:Object(n.jsx)(H,{name:e,className:"item__fillWidth",defaultValue:a[e],onChange:s(e,a[e],e)})})]},t)}))})}),Object(n.jsx)("table",{className:"table__table item__fillWidth",children:Object(n.jsxs)("tbody",{className:"table__td",children:[Object(n.jsx)("tr",{children:Object(n.jsx)("td",{children:"Ascension Stat"})}),Object(n.jsx)("tr",{children:Object(n.jsx)("td",{children:Object(n.jsx)(I,{array:m,onChange:u(r),defaultValue:a.ascensionStatType})})}),(e=a.ascensionStatType,t=a.ascensionStatValue,K(e,Object(n.jsx)(n.Fragment,{children:Object(n.jsx)("tr",{children:Object(n.jsxs)("td",{className:" characterField__inputUpper",children:[Object(n.jsx)("div",{}),Object(n.jsx)(H,{className:"item__fillWidth",defaultValue:t,onChange:d(l)})]})})})))]})})]})}),Ne=(a(17),function(e){return Object(n.jsx)("input",{type:"checkbox",defaultChecked:e.defaultValue,onClick:function(t){e.onChange(!e.defaultValue)}},e.key)}),Se="BuffName",we="BuffType",Ve="BuffValue",Ae="BuffToggle",De=function(e){var t=e.id,a=e.index,c=e.remove,r=Object(N.b)(),l=se(r),i=le(r),s=re(r),o=function(e){return function(t,a,n){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return function(r){var l={oldType:t};Array.isArray(r)?(l.oldValue=a*!r[c],l.newType=t,l.newValue=a*r[c]):(l.oldValue=a*!r[c],l.newType=t,l.newValue=a*r),Array.isArray(t)||e(C(l)),ie(e)(n)(r)}}}(r),u=[we,Ve],d=Object(R.a)(Object(R.a)({},Object(N.c)(ae)),Object(N.c)(E)),j=oe(u,l,d),b=oe(u,i,d),f=oe(u,s,d),h=oe(u,o,d);return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{className:"table__td Name",children:Object(n.jsx)("input",{type:"text",defaultValue:d.BuffName[a],onBlur:function(e){return j(Se,a)(e.target.value)}})}),Object(n.jsx)("td",{className:"table__td Type",children:Object(n.jsx)(I,{array:_,onChange:b(we,a,d.BuffToggle[a]),defaultValue:d.BuffType[a]})}),Object(n.jsx)("td",{className:"table__td Value",children:Object(n.jsx)(H,{onChange:f(Ve,a,d.BuffToggle[a]),defaultValue:d.BuffValue[a]})}),Object(n.jsx)("td",{className:"table__td Toggle",children:Object(n.jsx)(Ne,{onChange:h(Ae,a),defaultValue:d.BuffToggle[a]})}),Object(n.jsx)("td",{className:"table__td",children:c(a)})]},t)},Ce="BuffType",Me="BuffValue",Ee=[Ce,Me],Pe=function(e){return Object(n.jsxs)("table",{className:"table__table",children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[["Buff Name","Buff","Buff Amount","Active?"].map((function(e,t){return Object(n.jsx)("th",{className:"table__th",children:e},t)})),Object(n.jsxs)("th",{children:[" ",e.add()," "]})]})}),Object(n.jsx)("tbody",{children:e.array.map((function(t,a){return De({id:t,index:a,remove:e.remove})}))})]})},Be=function(){var e=Object(R.a)({},Object(N.c)(ae)),t=Object(N.b)(),a=le(t),c=re(t),r=e.BuffType?e.BuffType.length:0,l=oe(Ee,a,e),i=oe(Ee,c,e),s=ue(Ee,c,e),o=ue(Ee,a,e),u=[[o,"BuffName"],[s,Ce],[o,Me,0,i],[o,"BuffToggle",!0]];return Object(n.jsxs)("div",{children:["Buffs",Object(n.jsx)("div",{children:Object(n.jsx)(Oe,{initialLength:r,buttonText:"Add Buff",component:function(t){var a=t.id,c=t.index,r=Object(n.jsx)(n.Fragment,{children:K(e.BuffType[c],Object(n.jsx)(H,{onChange:i(Me,c),defaultValue:e.BuffValue[c]}))});return Object(n.jsx)("div",{children:Object(n.jsx)(I,{selectionName:Ce,onChange:l(Ce,c),array:T,component:r,defaultValue:e.BuffType[c]})},a)},addEffect:fe(e,u),removeEffect:he(e,u),children:Object(n.jsx)(Pe,{})})})]})},Re=(a(41),function(e){e=Object(R.a)(Object(R.a)({},Object(N.c)(ae)),e);var t=Object(N.b)(),a=le(t),c=re(t),r="artifactTypes-".concat(e.ArtifactNum),l="artifactValues-".concat(e.ArtifactNum),i=[r,l],s=oe(i,a,e),o=oe(i,c,e),u=Object(n.jsx)(H,{name:"Value",onChange:o(l,0),defaultValue:e[l][0]});return Object(n.jsx)("table",{className:"table__table",children:Object(n.jsxs)("tbody",{children:[Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{className:"table__td",children:"Main Stat"}),Object(n.jsx)("td",{className:"table__td",children:Object(n.jsx)(I,{array:e.mainStats,onChange:s(r,0),defaultValue:e[r][0],hideable:!1})}),Object(n.jsx)("td",{className:"table__td",children:u})]}),Array(4).fill(0).map((function(t,a){return function(t){var a=K(e[r][t],Object(n.jsx)(H,{name:"Value",onChange:o(l,t),defaultValue:e[l][t]}));return Object(n.jsxs)("tr",{children:[Object(n.jsxs)("td",{className:"table__td",children:["Line #",t]}),Object(n.jsx)("td",{className:"table__td",children:Object(n.jsx)(I,{array:T,onChange:s(r,t),defaultValue:e[r][t]},t)}),Object(n.jsx)("td",{className:"table__td",children:a})]},t)}(a+1)}))]})})}),Fe="artifactTypes-5",ke="artifactValues-5",Le=function(){var e=Object(R.a)({},Object(N.c)(ae)),t=Object(N.b)(),a=le(t),c=re(t),r=e["artifactTypes-5"]?e["artifactTypes-5"].length:0,l=[Fe,ke],i=oe(l,c,e),s=oe(l,a,e),o=ue(l,c,e),u=ue(l,a,e),d=[[o,Fe],[u,ke,0,i]],j=function(t){return Object(n.jsx)("div",{style:{overflowY:"scroll",maxHeight:"194px",border:"1px solid white"},children:Object(n.jsxs)("table",{className:"table__table",children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[["Type","Value"].map((function(e,t){return Object(n.jsx)("th",{className:"table__th",children:e},t)})),Object(n.jsxs)("th",{children:[" ",t.add()," "]})]})}),Object(n.jsx)("tbody",{children:t.array.map((function(a,c){return function(t){var a=t.id,c=t.index,r=t.remove,l=Object(n.jsx)(n.Fragment,{children:K(e["artifactTypes-5"][c],Object(n.jsx)(G,{onChange:i(ke,c),defaultValue:e["artifactValues-5"][c]}))});return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:Object(n.jsx)(I,{selectionName:Fe,onChange:s(Fe,c),array:g,defaultValue:e["artifactTypes-5"][c]})}),Object(n.jsx)("td",{children:l}),Object(n.jsx)("td",{children:r(c)})]},a)}({id:a,index:c,remove:t.remove})}))})]})})};return Object(n.jsx)("div",{children:Object(n.jsx)(Oe,{initialLength:r,title:"Passive Set Effects",buttonText:"Add Passive",wrapperClass:"setEffect--multifield",addEffect:fe(e,d),removeEffect:he(e,d),children:Object(n.jsx)(j,{})})})},Ie=(a(42),["Flower of Life","Plume of Death","Sands of Eon","Goblet of Eonotherm","Circlet of Logos"]),Ke="Set Effect",He=[j,b,f,h,O],Ge=function(){var e=Object(c.useState)(Ie[0]),t=Object(L.a)(e,2),a=t[0],r=t[1],l=function(e,t){return a===e?t:Object(n.jsx)("div",{},e)},i=function(e){return Object(n.jsx)(F,{className:"artifact__buttons",disabled:a===e,onClick:function(){return r(e)},children:e},e)};return Object(n.jsx)(n.Fragment,{children:Object(n.jsxs)("div",{children:[Object(n.jsxs)("span",{className:"section__App--row",children:["Artifacts",He.map((function(e,t){return i(Ie[t])})),i(Ke)]}),He.map((function(e,t){var a={ArtifactNum:t,mainStats:He[t]};return l(Ie[t],Object(n.jsx)(Re,Object(R.a)({},a),t))})),l(Ke,Object(n.jsx)(Le,{}))]})})},Je=function(e,t){return e>0&&e<91?t(e):0},Ue=function(e){return w(-29347e-10*Math.pow(e,5)+550672e-9*Math.pow(e,4)-.0332158793*Math.pow(e,3)+.9775531392*Math.pow(e,2)-4.2765576885*e+40.4647994435)},We=function(e){return w(-22838e-10*Math.pow(e,5)+.0004328837*Math.pow(e,4)-.0266303723*Math.pow(e,3)+.797170016*Math.pow(e,2)-4.1553061404*e+34.6845277878)},ze=function(e){return w(-16456e-10*Math.pow(e,5)+.0003056403*Math.pow(e,4)-.0180630927*Math.pow(e,3)+.5286068156*Math.pow(e,2)-1.9083528517*e+23.197198489)},Ye=function(e){return w(-7.316e-7*Math.pow(e,5)+.0001424157*Math.pow(e,4)-.0088061232*Math.pow(e,3)+.273018442*Math.pow(e,2)-1.2692979299*e+13.1641217855)},$e=function(e){return w(-6.815e-7*Math.pow(e,5)+.0001257728*Math.pow(e,4)-.0073286198*Math.pow(e,3)+.2100526539*Math.pow(e,2)-.5937899697*e+8.4614696213)},qe=function(e){return Je(e,Ue)},Qe=function(e){return Je(e,ze)},Xe=function(e){return Je(e,$e)},Ze=function(e){return Je(e,We)},et=function(e){return function(e){return w(9e-8*Math.pow(e,3)-2767e-7*Math.pow(e,2)+.46647865*e+.19667643)}(e)},tt=function(e){return function(e){return w(4e-8*Math.pow(e,3)-11561e-8*Math.pow(e,2)+.19487198*e+.07024967)}(e)},at=function(e){return et(e)},nt=function(e){return tt(e)},ct="TalentName",rt="DamageType",lt="ReactionMultipliers",it="DamageValue",st=function(e,t){return e>t?e-t:-(t-e)/2},ot=function(e,t,a){return(100+e)/((100+t)*(1-a/100||0)+(100+e))},ut=function(e){var t,a=e.id,c=e.index,r=e.remove,l=Object(N.b)(),i=se(l),o=se(l),u=[rt,it],d=Object(R.a)(Object(R.a)({},Object(N.c)(ae)),Object(N.c)(E)),j=oe(u,o,d),b=oe(u,i,d),f=void 0;if(Y.includes(d.DamageType[c])){var h=function(e,t){var a=e.DamageType[t],n=e.DamageValue[t];if("None"===a||0===n)return[null,null];var c=nt(e.totalEM),r=e.totalATK,l=e.totalCritDMG,i={None:1,"Pyro Vaporize/Cryo Melt":w(1.5*(1+c/100)),"Hydro Vaporize/Pyro Melt":w(2*(1+c/100))}[e.ReactionMultipliers[t]],o=function(){for(var e=0,t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];for(var c in a)e+=u(a[c]);return e},u=function(t){return e[t]||0},d={"Phys. Normal":100+o(s.Normal,s.Total,s.phys),"Phys. Charge":100+o(s.Charge,s.Total,s.phys),"Ele. Normal":100+o(s.Normal,s.Total,s.ele),"Ele. Charge":100+o(s.Charge,s.Total,s.ele),"Ele. Skill":100+o(s.Skill,s.Total,s.ele),"Ele. Burst":100+o(s.Burst,s.Total,s.ele)},j=ot(e.LVL,Math.max(1,e.monsterLevelStr),e.defReduction),b=1-st(e.monsterResStr,e.resReduction)/100,f=Math.floor(r*(n/100)*(d[a]/100)*b*j*i);return[f,Math.floor(f*(1+l/100))]}(d,c),O=Object(L.a)(h,2);t=O[0],f=O[1]}else $.includes(d.DamageType[c])&&(t=function(e,t){var a,n=at(e.totalEM),c=e.LVL,r={Swirl:w((a=c,Je(a,Ye)*(1+n/100+(e[s.Swirl]||0)/100))),Shattered:w(Ze(c)*(1+n/100+(e[s.Shattered]||0)/100)),Overload:w(qe(c)*(1+n/100+(e[s.Overload]||0)/100)),Electrocharge:w(Qe(c)*(1+n/100+(e[s.Eletrocharge]||0)/100)),Superconduct:w(Xe(c)*(1+n/100+(e[s.Superconduct]||0)/100))},l=e.DamageType[t],i=1-st(e.monsterResStr,e.resReduction)/100;return Math.floor(r[l]*i)}(d,c));return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{className:"table__td",children:Y.includes(d.DamageType[c])?Object(n.jsx)("input",{type:"text",defaultValue:d.TalentName[c],onBlur:function(e){return j(ct,c)(e.target.value)}}):Object(n.jsx)(n.Fragment,{})}),Object(n.jsx)("td",{className:"table__td",children:Object(n.jsx)(I,{array:Y.concat($),onChange:b(rt,c),defaultValue:d.DamageType[c]})}),Object(n.jsx)("td",{className:"table__td",children:Y.includes(d.DamageType[c])?Object(n.jsx)(H,{onChange:j(it,c),defaultValue:d.DamageValue[c]}):Object(n.jsx)(n.Fragment,{})}),Object(n.jsx)("td",{className:"table__td",children:Y.includes(d.DamageType[c])?Object(n.jsx)(I,{array:["None","Pyro Vaporize/Cryo Melt","Hydro Vaporize/Pyro Melt"],onChange:b(lt,c),defaultValue:d.ReactionMultipliers[c]}):Object(n.jsx)(n.Fragment,{})}),Object(n.jsx)("td",{className:"table__td",children:t?t.toLocaleString():""}),Object(n.jsx)("td",{className:"table__td",children:f?f.toLocaleString():""}),Object(n.jsx)("td",{className:"table__td",children:r(c)})]},a)},dt=(a(43),"DamageType"),jt="DamageValue",bt="monsterLevelStr",ft="monsterResStr",ht="resReduction",Ot="defReduction",pt=function(){var e=Object(R.a)(Object(R.a)({},Object(N.c)(ae)),Object(N.c)(E)),t=Object(N.b)(),a=ie(t),c=se(t),r=se(t),l=[dt,jt],i=e.DamageType?e.DamageType.length:0,s=ue(l,r,e),o=ue(l,c,e),u=[[o,"TalentName"],[s,dt,"None"],[o,jt],[o,"ReactionMultipliers","None"]],d=function(e){return Object(n.jsxs)("table",{className:"table__table",children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[["Talent","Type","Damage Multiplier","Reaction Multiplier","Normal Hit","Critical Hit"].map((function(e,t){return Object(n.jsx)("th",{className:"table__th",children:e},t)})),Object(n.jsxs)("th",{children:[" ",e.add()," "]})]})}),Object(n.jsx)("tbody",{children:e.array.map((function(t,a){return ut({id:t,index:a,remove:e.remove})}))})]})},j={"Player Level":e.LVL,"Monster Level":e[bt],"Monster Resistance":e[ft]},b=Object.keys(j).filter((function(e){return void 0===j[e]})),f=st(e[ft],e[ht]),h=ot(e.LVL,Math.max(1,e[bt]),e[Ot]),O=[bt,ft,ht,Ot].map((function(t,c){return Object(n.jsx)("td",{className:"table__td",children:Object(n.jsx)(H,{onChange:a(t),defaultValue:e[t]})},c)}));return Object(n.jsxs)("div",{children:[Object(n.jsxs)("table",{className:"table__table",children:[Object(n.jsx)("thead",{children:Object(n.jsx)("tr",{children:["Monster Lvl","Monster Res(%)","Res Reduction(%)","Def Reduction(%)","Total Res","Monster Defense"].map((function(e,t){return Object(n.jsx)("th",{className:"table__th",children:e},t)}))})}),Object(n.jsx)("tbody",{children:Object(n.jsxs)("tr",{children:[O,Object(n.jsxs)("td",{className:"table__td",children:[f,"%"]}),Object(n.jsxs)("td",{className:"table__td",children:[w(100*(1-h)),"%"]})]})})]}),b.length>0?Object(n.jsxs)("div",{children:[" Missing : ","".concat(b.join())," "]}):Object(n.jsx)(n.Fragment,{}),Object(n.jsx)(Oe,{initialLength:i,addEffect:fe(e,u),removeEffect:he(e,u),children:Object(n.jsx)(d,{})})]})},mt=(a(44),a(47)),xt="@allCharacters",yt=Object(S.b)({name:"characters",initialState:function(){var e=localStorage.getItem(xt);if(null===e){var t={names:["Traveler"],UID:[Object(mt.a)()]};return localStorage.setItem(xt,JSON.stringify(t)),t}try{return JSON.parse(e)}catch(a){console.log("Could not read from localstorage")}}(),reducers:{addNewCharacter:function(e,t){var a=t.payload,n=e.names,c=e.UID;n.push(a.name||"New Character"),c.push(Object(mt.a)()),e.names=n,e.UID=c,localStorage.setItem(xt,JSON.stringify({names:n,UID:c}))},renameCharacter:function(e,t){var a=t.payload;e.names[a.index]=a.name,localStorage.setItem(xt,JSON.stringify({names:e.names,UID:e.UID}))},deleteCharacter:function(e,t){var a=t.payload,n=Array.from(e.names);n.splice(a.index,1),e.names=n,localStorage.setItem(xt,JSON.stringify({names:e.names,UID:e.UID}))}}}),vt=yt.actions,gt=vt.addNewCharacter,Tt=vt.renameCharacter,_t=(vt.deleteCharacter,function(e){return e.characters}),Nt=yt.reducer,St="Stats",wt=function(){var e,t=Object(R.a)({},Object(N.c)(ae)),a=Object(N.b)(),r=t.view||St,l=(e={},Object(k.a)(e,St,Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("div",{className:"section__mainBody--row",children:[Object(n.jsx)(_e,{}),Object(n.jsx)(Te,{}),Object(n.jsx)(Ge,{})]}),Object(n.jsx)(Be,{})]})),Object(k.a)(e,"Damage Calc",Object(n.jsx)(pt,{})),Object(k.a)(e,"Export",function(){var e=Object(R.a)({},Object(N.c)(ae)),t=Object(N.b)(),a=Object(c.useState)(""),r=Object(L.a)(a,2),l=r[0],i=r[1];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("textarea",{className:"body__textarea",onChange:function(e){i(e.target.value)},defaultValue:l},e.currentSheet),Object(n.jsx)("div",{children:Object(n.jsx)(F,{onClick:function(){try{var a=JSON.parse(l);a.currentSheet=e.currentSheet,a.view=St,t(ee(a)),t(M(a))}catch(n){console.log(n)}},children:"Import"})}),Object(n.jsx)("div",{children:Object(n.jsx)(F,{onClick:function(){e.currentSheet=void 0,e.view=void 0,e.index=void 0,i(JSON.stringify(e))},children:"Export"})})]})}()),e);return Object(n.jsx)("div",{className:"section__mainBody",children:Object(n.jsx)("div",{className:"section__mainBody",children:Object.keys(l).map((function(e){return 0===r.localeCompare(e)?Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{children:[Object(n.jsx)("input",{type:"text",defaultValue:t.currentSheet,onBlur:function(e){a(Tt({index:t.index,name:e.target.value})),a(ee({currentSheet:e.target.value}))}}),Object.keys(l).map((function(e){return Object(n.jsx)(F,{disabled:t.view===e,onClick:function(){return function(e,t){e(ee({view:t}))}(a,e)},children:e},e)}))]}),l[e]]},e):Object(n.jsx)("div",{},e)}))})},t.currentSheet)},Vt=function(){var e=Object(N.b)(),t=Object(N.c)(ae),a=Object(N.c)(_t),r=function(){void 0!==t.index&&localStorage.setItem(a.UID[t.index],JSON.stringify(t))};window.addEventListener("unload",r),Object(c.useEffect)((function(){l(e,0)}),[]);var l=function(e,t){r();var n=q(a.UID[t]);n.currentSheet=a.names[t],n.index=t,e(te(n)),e(M(n))};return Object(n.jsxs)("div",{className:"section__App--row",children:[Object(n.jsx)("div",{className:"section__navbar",children:Object(n.jsxs)("div",{className:"section__App--column",children:[a.names.map((function(c,r){return Object(n.jsx)(F,{style:{width:"-webkit-fill-available"},disabled:t.index===c,onClick:function(){return l(e,r)},children:c},a.UID[r])})),Object(n.jsx)(F,{onClick:function(){e(gt({}))},children:"Add New Sheet"})]})}),t.currentSheet?Object(n.jsxs)("div",{className:"section__mainBody section__App--row",children:[Object(n.jsx)(wt,{}),Object(n.jsx)(B,{})]}):Object(n.jsx)(n.Fragment,{children:" "})]})};var At=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)("header",{className:"App-header",children:Object(n.jsx)(Vt,{})})})},Dt=Object(S.a)({reducer:{characters:Nt,sheet:ne,stats:P}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(N.a,{store:Dt,children:Object(n.jsx)(At,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[45,1,2]]]);
//# sourceMappingURL=main.14f6b6af.chunk.js.map