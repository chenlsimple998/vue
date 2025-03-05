import type { RouteRecordRaw } from 'vue-router';

// 定义一个函数来生成 'pathName' 系列的路由配置
function generateComponentRoutes(pathName: string,pathIndex: number): RouteRecordRaw[] {
    const arrRoutes: RouteRecordRaw[] = [];
    for (let i = 0; i <= pathIndex; i++) {
      arrRoutes.push({
            path: `${pathName}${i}`,
            name: `${pathName}${i}`,
            component: () => import(`@/views/${pathName}${i}.vue`),
            meta: { layout: 'default' }
        });
    }
    return arrRoutes;
}

export { generateComponentRoutes };
