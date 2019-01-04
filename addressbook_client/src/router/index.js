import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/login';
import Container from '../components/container';
import Main from '../components/main';
import List from '../components/list';


Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        component: Container,
        children: [{
            path: 'login',
            component: Login
        }, {
            path: 'main',
            component: Main,
            children:[{
                path:'list',
                component: List
            }]
        }]
    }]
});




// export default new Router({
//     // mode: 'history',
//     routes: [
//         {
//             path: '/',
//             component: Root,
//             children: [{
//                 path: 'login',
//                 component: Login
//             }, {
//                 path: 'header',
//                 component: Header,
//                 children: [{
//                     path: 'userAdmin',
//                     components: {
//                         header: UserAdminHeader,
//                         content: UserAdmin
//                     }
//                 }, {
//                     path: 'companyAdmin',
//                     components: {
//                         header: CompanyAdminHeader,
//                         content: CompanyAdmin
//                     }
//                 }]
//             }]
//         }
//     ]
// })