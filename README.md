# angular-BMap
1. angularjs简单封装百度地图;
2. 在app.js中引用angularMap模块,<br/>
如：angular.module('bMapApp', ['angularMap']);<br/>
##使用Bower安装
bower install angular-BMap --save<br/>
或<br/>
bower install douxc/angular-BMap --save<br/>
##initMap
初始化地图操作
##geoLocation
获取当前位置
##geoLocationAndCenter
获取当前位置，并将地图中心点移到该位置
##默认的地图指令angularBmap
使用方式：\<angular-bmap\>\</angular-bmap\>