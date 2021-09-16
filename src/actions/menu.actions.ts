import { DISPATCH_MENU } from "./constants"
import { menu } from '../mock'
export const menuDispatch = (menuList: any[]) => ({
    type: DISPATCH_MENU,
    payload: menuList
})

export function menuActions(params?: any) {
    return (dispatch: any) => {
        const data = menu
        dispatch(menuDispatch(data))
    }
}

