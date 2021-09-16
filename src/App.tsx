import React, { Suspense } from 'react'
import { Spin, ConfigProvider } from 'antd'
import microApp from '@micro-zoe/micro-app'
import zhCN from 'antd/es/locale/zh_CN'
import Routers from './routers/index'



function App() {

    microApp.start({
        inline: false, // 是否使用内联script
        destory: true, // 卸载时是否强制删除缓存资源
        disableScopecss: false, // 是否禁用样式隔离
        disableSandbox: false, // 是否禁用js沙箱
        macro: false, // 是否以宏任务方式绑定元素作用域(开启之后需要在unmount时手动解绑removeDomScope())
        shadowDOM: false, // 是否开启shadowDOM（shadowDOM在React16及以下、vue3中的兼容不是很好）
        // lifeCycles: {
        //     created(e) {
        //         console.log('created')
        //     },
        //     beforemount(e) {
        //         console.log('beforemount')
        //     },
        //     mounted(e) {
        //         console.log('mounted>>>', e)
        //     },
        //     unmount(e) {
        //         console.log('unmount')
        //     },
        //     error(e) {
        //         console.log('error>>>', e)
        //     }
        // }
    })
    return (
        <ConfigProvider locale={zhCN}>
            <Suspense fallback={<Spin tip="努力加载中..."><div className='loadingbox'></div></Spin>}>
                <Routers />
            </Suspense>
        </ConfigProvider>

    );
}

export default App;
