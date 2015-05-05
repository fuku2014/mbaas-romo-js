/** @jsx React.DOM */
/*
 * リッチプッシュ用のview
 * 指定されたファイル名の画像を表示するだけ
 */
(function(definition){
  Push = definition();
})(function(){
  var Push = React.createClass({
    render: function () {
      return(
        <div id="main">
          <Item fileName={this.props.params.fileName} />
        </div>
      );
    }
  });
  return Push;
});
