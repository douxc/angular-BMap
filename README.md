# angular-BMap
1. angularjs简单封装百度地图;
2. 在app.js中引用angularMap模块,如：angular.module('bMapApp', ['angularMap']);
3. 所有方法均返回promise对象

##使用Bower安装
bower install angular-BMap --save或bower install douxc/angular-BMap --save
##默认中心点设置
angularBMapProvider.setDefaultPosition(lng,lat)
>默认中心点为南京

##initMap
初始化地图操作
##geoLocation
获取当前位置
##geoLocationAndCenter
获取当前位置，并将地图中心点移到该位置
##默认的地图指令angularBmap
使用方式：\<angular-bmap\>\</angular-bmap\>