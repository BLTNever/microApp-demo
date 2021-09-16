import React, { } from 'react'
import { Layout } from 'antd'

import { Nav } from './components'
import './index.less'


const { Header } = Layout

const LayoutNav = (props: any) => {

    return (
        <Header id="layout-header">
            <div className="left">
                <div id="layout-nav"><Nav /></div>
            </div>
        </Header >
    )
}

export default LayoutNav