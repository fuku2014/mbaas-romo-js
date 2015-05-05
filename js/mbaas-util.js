/** ニフクラモバイルバックエンドに対する操作を行う */
(function(definition){
  MbaasUtil = definition();
})(function(){
  var MbaasUtil = function MbaasUtil(){};
  var APP_KEY    = "";
  var CLIENT_KEY = "";

  NCMB.initialize(APP_KEY, CLIENT_KEY);
  /*
   * 画像ファイルの データを取得する
   */  
  MbaasUtil.getImageData = function(fileName){
    var promise = new NCMB.Promise();
    var objFile = new NCMB.File(fileName, null, null, null);
    objFile.fetch().then(function(){
      promise.resolve(objFile.getData());
    });
    return promise;
  }
  /*
   * データストアのファイル名一覧を取得する
   */  
  MbaasUtil.fetchDataStore = function(roomId){
    var promise = new NCMB.Promise();
    var Image = NCMB.Object.extend("image");
    var query = new NCMB.Query(Image);
    query.descending("createDate");
    query.find({
      success: function(results) {
        var dataList = results.map(function(result){
          return result.get("imagetitle");
        });
        promise.resolve(dataList);
      },
      error: function(error) {
        console.log(error);
      }
    }); 
    return promise;
  }
  return MbaasUtil;
});
