import React, { memo } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import LayoutHeader from './layoutHeader'
moment.locale('en')
const { Content } = Layout
interface IProps {
    children: any
    location?: any
}

const Main = memo((props: IProps & RouteComponentProps) => {
    return (
        <Layout style={{ minHeight: '100%' }} id="portal-app">
            <LayoutHeader />
            <Layout id="protal-body">
                <Content id="portal-content">
                    {props.children}
                </Content>
            </Layout>
        </Layout>
    )
})

export default withRouter(Main)
