/** @jsx React.DOM */
/*
 * ルートコンポーネント
 */
(function(definition){
  App = definition();
})(function(){
  var RouteHandler = ReactRouter.RouteHandler;
  var App = React.createClass({
    render: function () {
      return (
        <h1>Photos by Romo<RouteHandler {...this.props}/></h1>
      );
    }
  });
  return App;
});
