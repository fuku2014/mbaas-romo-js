/** @jsx React.DOM */
/*
 * スライドショー表示用のview
 * まずmbaasのデータストアからファイル名一覧を取得し、その後各ファイルのデータをrenderする
 */
(function(definition){
  Slider = definition();
})(function(){
  var Slider = React.createClass({
    renderItems: function(){
      // 各画像データの描画
      if(this.state && this.state.images){
        var items =[];
        for(var i = 0; i < this.state.images.length; i++){
            var fileName = this.state.images[i];
            items.push(<Item fileName={fileName} key={fileName} actived={i === 0}/>);
        }
        return items;
      }
    },
    componentWillMount: function(){
      var roomId = this.props.params.roomId;
      var that = this;
      MbaasUtil.fetchDataStore(roomId).then(function(dataList){
        that.setState({images:dataList});
      });
    },
    componentDidMount: function() {
      var roomId = this.props.params.roomId;
      var that = this;
      // 5分に１回自動で更新させる
      setInterval(function(){
        MbaasUtil.fetchDataStore(roomId).then(function(dataList){
          that.setState({images:dataList});
        });
      }, 300000); 
    },
    start: function(e){
      // スライドショー再開
      var btn = $(e.target);
      btn.button('loading');
      setTimeout(function() {
        $('#carousel_sample').carousel('cycle');
        btn.button('reset');
      },1000);
    },
    stop: function(e){
      // スライドショー停止
      var btn = $(e.target);
      btn.button('loading');
      setTimeout(function() {
        $('#carousel_sample').carousel('pause');
        btn.button('reset');
      },1000);
    },
    reload: function(e){
      // stateの値が変更されることによって、自動的に再renderされる
      var btn = $(e.target);
      btn.button('loading');
      var roomId = this.props.params.roomId;
      var that = this;
      MbaasUtil.fetchDataStore(roomId).then(function(dataList){
        that.setState({images:dataList});
        btn.button('reset');
      });
    },
    render: function () {
      return(
        <div id="main">
          <div id="carousel_sample" className="carousel slide" data-ride="carousel" data-interval="5000">
            <div className="carousel-inner">
              {this.renderItems()}
            </div>
            <a className="left carousel-control" href="#carousel_sample" data-slide="prev">
              <span className="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a className="right carousel-control" href="#carousel_sample" data-slide="next">
              <span className="glyphicon glyphicon-chevron-right"></span>
            </a>
          </div>
          <div className="row btn-controls">
            <button className="col-sm-4 btn btn-info" type="button" onClick={this.start} data-loading-text="Starting...">再生</button>
            <button className="col-sm-4 btn btn-info" type="button" onClick={this.stop} data-loading-text="Stoped...">停止</button>
            <button className="col-sm-4 btn btn-info" type="button" onClick={this.reload} data-loading-text="loading...">更新</button>
          </div>
        </div>
      );
    }
  });
  return Slider;
});
