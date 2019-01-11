import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/login';
import Container from '../components/container';
import Main from '../components/main';
import List from '../components/list';
import Create from '../components/create'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Container,
        children: [{
            path: 'login',
            component: Login
        }, {
            path: 'main',
            component: Main,
            children: [{
                path: 'list',
                component: List
            }, {
                path: 'create',
                component: Create
            }]
        }]
    }]
});