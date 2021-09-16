/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '../utils/jsxCustomEvent'
import React, { memo, useCallback, useEffect } from 'react'
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import microApp from '@micro-zoe/micro-app'
import { isEmpty } from 'lodash'
import { useBoolean } from 'ahooks'
import { useHistory } from 'react-router-dom'

import { IEnum } from '@typings/index'
// import PortalAside from '../PortalAside'
import './index.less'

interface IProps {
    route: string
    url: string
}

const MicroApp = (props: IProps) => {
    const { route, url } = props
    const [loading, { setTrue, setFalse }] = useBoolean(false)

    const history = useHistory()
    console.log('route>>>', route)
    const info = {
        subApp: route
    }
    /**
     * 
     * @param param
     */
    const handleExtends = (param: any) => {

    }
    const handleJump = (link: string) => {
        if (!link?.length) return
        history.push(link)
    }
    const enumsType: IEnum = {
        'extends': handleExtends,
        'jump': handleJump
    }
    /**
     * 获取子项目发送的数据
     * @param param
     */
    const listenData = ({ detail: { data } }: any) => {
        try {
            const { type, param } = data
            // console.log(param, type)
            if (isEmpty(param) || !type?.length) return
            if (!enumsType.hasOwnProperty(type)) {
                console.log('未存在该条指令')
                return
            }
            enumsType[type]!(param)
        } catch (error) {
            console.log(error)
            throw new Error('获取数据失败')
        }
    }

    /**
     * 监听子应用发布的全局消息
     */
    const globalListener = useCallback((data: any) => {
        console.log('主应用获取子应用全局数据：', data)
    }, [])
    useEffect(() => {
        microApp.addGlobalDataListener(globalListener, true)
        return () => microApp.removeGlobalDataListener(globalListener)
    }, [globalListener])

    // 主应用发布全局消息
    // useEffect(() => {
    //     microApp.setGlobalData({ type: '主应用发送全局数据' })
    // }, [])

    return (
        // <div id="micro-controller">
        //     <Spin spinning={loading} size="large">
        <micro-app name={route}
            key={route}
            url={'http://localhost:3004'}
            baseroute={`/${route}`}
            // baseroute={route}
            data={info}
            onDataChange={listenData}
            // onCreated={() => setTrue()}
            // onMounted={() => setFalse()}
            // onError={() => setFalse()}
            onCreated={() => console.log('micro-app元素被创建')}
            onBeforemount={() => console.log('即将被渲染')}
            onMounted={() => console.log('已经渲染完成')}
            onUnmount={() => console.log('被卸载')}
            onError={() => console.log('渲染出错')}
        ></micro-app>
        //     </Spin>
        // </div>
    )
}

export default (MicroApp)