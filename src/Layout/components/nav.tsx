import React, { memo, useMemo, useCallback, useState, useEffect, forwardRef } from 'react'
import { Dropdown, Menu, Tabs } from 'antd'
import { useHistory } from 'react-router-dom'
import { useMount, useBoolean } from 'ahooks'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

import { menuActions } from '../../actions'
import { IMenu } from '@typings/index'

import useResize from '../../hooks/useResize'
import './index.less'
const { Item } = Menu
const { TabPane } = Tabs

const Nav = forwardRef((props: any, ref: any) => {
    const history = useHistory()
    // const sizeRef: any = useRef()
    // const size = useSize(sizeRef) // 初始化可用 ahooks
    const ele = document.querySelector('#layout-nav')
    const size = useResize(ele)
    const width = useMemo(() => { if (size.width) return size.width - 140 }, [size.width])
    const bodySize = useResize(document.body)
    const bodyWidth = useMemo(() => { if (bodySize.width) return bodySize.width - 186 }, [bodySize.width])

    const _useDispatch = useDispatch()
    const { list } = useSelector((state: any) => state.menu)
    const { location: { pathname } } = history
    const [activeKey, setActiveKey] = useState<string>('')
    const [visible, { toggle, setFalse }] = useBoolean(false)

    const handleTabsChange = (key: string) => {
        setActiveKey(key)
        history.push(`/${key}`)
        // window.location.assign(`/${key}`)
    }

    const handleMenuClick = (item: any) => {
        let { key } = item
        setActiveKey(key)
        setFalse()
        history.push(`/${key}`)
        // window.location.assign(`/${key}`)
    }

    const renderMenu = useMemo(() => {
        if (!list?.length) return null
        return list.map((menu: IMenu) => (
            <TabPane tab={menu.name} key={menu.route}></TabPane>
        ))
    }, [list])

    const dropMenu = () => {
        return <Menu id="nav-drop-menu" onClick={handleMenuClick} selectedKeys={[activeKey]} style={{ width: bodyWidth }}>
            {list.map((menu: IMenu) => (
                <Item key={menu.route}>{menu.name}</Item>
            ))}
        </Menu>
    }
    const lisnterPath = useCallback((pathname: string) => {
        if (!list?.length) return
        const reg = /[^\\/]+/
        const [path] = pathname.match(reg) || ['']
        setActiveKey(path)
        const hasPath = list.some((i: IMenu) => i.route === path)
        if (!hasPath) history.push(`/`)
    }, [list, history])

    useEffect(() => {
        if (pathname?.length) {
            lisnterPath(pathname)
        }
    }, [pathname, lisnterPath])

    useMount(() => _useDispatch(menuActions()))


    return (
        <div id="header-nav" key={props.state}>
            <div id="header-menu" style={{ width: width }}>
                <Tabs type="card"
                    tabPosition="top"
                    destroyInactiveTabPane={true}
                    tabBarGutter={10}
                    onChange={handleTabsChange}
                    activeKey={activeKey}
                >
                    {renderMenu}
                </Tabs>
            </div>
            <div id="drop-menu">
                <Dropdown overlay={dropMenu} trigger={['click']}
                    onVisibleChange={() => toggle()}
                    visible={visible}
                    destroyPopupOnHide={true}
                    getPopupContainer={() => document.getElementById('drop-menu') || document.body}
                    placement="bottomRight"
                >
                    <div id="drop-menu-btn">
                        {visible ? <span>收起<CaretUpOutlined /></span> : <span>展开<CaretDownOutlined /></span>}
                    </div>
                </Dropdown>
            </div>
        </div>
    )
})

export default memo(Nav)