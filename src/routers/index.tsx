import React, { } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { IMenu } from '@typings/index'

import Main from '../Layout/index'
import MicroApp from '../controller'

const Routers = (props: any) => {
    const menuList = useSelector((state: any) => state.menu.list)

    const renderItem = (menu: IMenu) => {
        const { route, } = menu

        return <Route path={`/${route}`} key={route}>
            <MicroApp route={route} url={''} key={route} />
        </Route>
    }

    const renderRouter = () => {
        if (!menuList?.length) return null
        return menuList.map((menu: IMenu) => (renderItem(menu)))
    }

    return (
        <BrowserRouter>
            <Main>
                <Switch>
                    {renderRouter()}
                </Switch>
            </Main>
        </BrowserRouter >
    )
}

export default Routers
