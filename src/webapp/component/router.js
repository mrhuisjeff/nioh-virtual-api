/**
 * Created by Administrator on 2017/3/8.
 */
import React;
import { Router, Route, Link, browserHistory } from 'react-router'
import Root from 'component/root.js';
import Edit from 'component/edit.js';
import Detail from 'component/Detail.js';
import Welcome from 'component/welcome.js';
import List from 'component/list.js';

const router = (<Router history={browserHistory}>
    <Route path="/" component={Root}>
        <Route path="new" component={Edit}/>
        <Route path="edit/:id" component={Edit}/>
        <Route path="detail/:id" component={Detail}/>
        <Route path="list/:id" component={List}/>
        <Route path="*" component={Welcome}/>
    </Route>
</Router>);
module.exports = router;