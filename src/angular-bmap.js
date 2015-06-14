/***
 * angularjs 使用指令封装百度地图
 * Created by xc on 2015/6/13.
 */
(function (window, angular) {
  'use strict';
  var angularMapModule = angular.module('angularBMap', []);
  angularMapModule.provider('angularBMap', mapService);//定位服务
  angularMapModule.directive('angularBmap', mapDirective);//定位指令
  /*
   * 定位相关服务
   */
  function mapService() {
    //基础配置
    this.default_position = new BMap.Point(118.789572, 32.048667);//地图默认中心点
    /**
     * 设置地图默认中心点
     * @param lng
     * @param lat
     * @returns {mapService}
     */
    this.setDefaultPosition = function (lng, lat) {
      this.default_position = new BMap.Point(lng, lat);
      return this;
    };

    //返回的服务
    this.$get = BMapService;
    BMapService.$inject = ['$q', '$timeout'];
    function BMapService($q, $timeout) {
      var map,//全局可用的map对象
        default_position = this.default_position;//默认中心点
      return {
        initMap: initMap,//初始化地图
        getMap: getMap,//返回当前地图对象
        geoLocation: geoLocation,//获取当前位置
        geoLocationAndCenter: geoLocationAndCenter//获取当前位置，并将地图移动到当前位置
      };
      /**
       * 获取map对象
       * @alias getMap
       */
      function getMap() {
        if (!map) {
          map = new BMap.Map('bMap');//地图对象
        }
        return map;
      }

      /**
       * 初始化地图
       * @constructor
       */
      function initMap() {
        var defer = $q.defer();
        $timeout(function () {
          getMap().centerAndZoom(default_position, 14);
          defer.resolve();
        });
        return defer.promise;
      }

      /**
       * 调用百度地图获取当前位置
       * @constructor
       */
      function geoLocation() {
        var defer = $q.defer(), location = new BMap.Geolocation();//百度地图定位实例
        location.getCurrentPosition(function (result) {
          if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            //定位成功,返回定位地点和精度
            defer.resolve(result);
          } else {
            defer.reject('不能获取位置');
          }
        }, function (err) {
          defer.reject(err);
        });
        return defer.promise;
      }

      /**
       * 获取当前位置，并将地图移动到当前位置
       * @constructor
       */
      function geoLocationAndCenter() {
        var defer = $q.defer();
        geoLocation().then(function (result) {
          getMap().panTo(result.point);
          var marker = new BMap.Marker(result.point);
          getMap().addOverlay(marker);
          defer.resolve(result);
        }, function (err) {
          //定位失败
          getMap().panTo(default_position);
          var marker = new BMap.Marker(default_position);
          getMap().addOverlay(marker);
          defer.reject();
        });
        return defer.promise;
      }
    }
  }

  /***
   * 地图指令
   */
  mapDirective.$inject = ['angularBMap'];
  function mapDirective(angularBMap) {
    return {
      restrict: 'EAC',
      replace: true,
      scope: true,
      template: '<div id="bMap" style="height: 100%;"></div>',
      link: mapLink,
      controller: mapController
    };
    /**
     * link
     * @constructor
     * @param scope
     * @param element
     * @param attr
     * @param ctrl
     */
    function mapLink(scope, element, attr, ctrl) {
      ctrl.initMap();
      ctrl.geoLocationAndCenter().then(function (result) {
        //定位成功
        console.log(result);
      }, function (err) {
        //定位失败
        console.info(err);
      });
    }

    /**
     * controller
     * @constructor
     * @type {string[]}
     */
    function mapController() {
      this.geoLocation = angularBMap.geoLocation;//定位
      this.initMap = angularBMap.initMap;//初始化
      this.geoLocationAndCenter = angularBMap.geoLocationAndCenter;//获取当前定位并移动到地图中心
    }
  }
})(window, window.angular);