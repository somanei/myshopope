import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueRouter);

import Home from "./components/main/Home";
import Ppgl from './components/main/goodsManage/Ppgl';
import Gggl from "./components/main/goodsManage/Gggl";
import Mbgl from "./components/main/goodsManage/Mbgl";
import Spflgl from "./components/main/goodsManage/Spflgl";
import Spsh from "./components/main/goodsManage/Spsh";
import Sjsh from "./components/main/merchant/Sjsh";
import Sjgl from "./components/main/merchant/Sjgl";
import Gglxgl from "./components/main/advertising/Gglxgl";
import acGggl from './components/main/advertising/Gggl';


var router = new VueRouter({ //注册组件
  routes:[
    {path:'',component:Home},
    {path:'/home',component: Home},
    {path:"/ppgl",component:Ppgl},
    {path:"/gggl",component:Gggl},
    {path:"/mbgl",component:Mbgl},
    {path:"/spflgl",component:Spflgl},
    {path:"/spsh",component:Spsh},
    {path:"/sjsh",component:Sjsh},
    {path:"/sjgl",component:Sjgl},
    {path:"/gglxgl",component:Gglxgl},
    {path:"/acGggl",component:acGggl}
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
