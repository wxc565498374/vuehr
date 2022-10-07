import {getRequest} from "./api";

export const initMenu = (router, store) => {
    // 正常的请求，非用户刷新页面
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/config/menu").then(data => {
        if (data) {
            // 拿到后端的菜单数据，做格式化
            let fmtRoutes = formatRoutes(data);
            router.addRoutes(fmtRoutes);
            // 放到store里
            store.commit('initRoutes', fmtRoutes);
            //store.dispatch('connect');
        }
    })
}
export const formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        // 一级菜单做递归
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        }
        // 把格式化后的fmRouter添加的需要返回的数据中去
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}
