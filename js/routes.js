/*
 * ルーティング処理を行う
 * リッチプッシュ : http://{ドメイン}/#/push/{ファイル名}
 * スライドショー : http://{ドメイン}/#/slider/{romoのID}
 */
var Route = ReactRouter.Route;
var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="push" path="/push/:fileName" handler={Push}/>
    <Route name="slider" path="/slider/:roomId" handler={Slider}/>
  </Route>
);
ReactRouter.run(routes, function (Handler,state) {
  React.render(<Handler params={state.params}/>, document.body);
});
