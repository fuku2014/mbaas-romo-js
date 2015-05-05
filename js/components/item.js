/** @jsx React.DOM */
/*
 * 画像のviewを提供する
 * componentWillMount()にてmbaasから画像データを取得し、base64エンコーディングして表示する
 */
(function(definition){
  Item = definition();
})(function(){
  var Item = React.createClass({
    componentWillMount: function(){
      var that = this;
      var fileName = this.props.fileName;
      MbaasUtil.getImageData(fileName).then(function(data){
        that.setState({imgData:data});
      });
    },
    renderImage: function(){
      if(this.state && this.state.imgData){
        return <img src={"data:image/jpeg;base64," + window.btoa(this.state.imgData)} />;
      }
    },
    render: function() {
      return (
          <div className={this.props.actived ? "item active" : "item"}>
            {this.renderImage()}
          </div>
      );
    }
  });
  return Item;
});
