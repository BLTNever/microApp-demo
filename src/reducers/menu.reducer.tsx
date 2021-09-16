import { DISPATCH_MENU, } from "../actions/constants"


export const menu = (state: any = {}, action: any = {}) => {
    const { type, payload } = action
    switch (type) {
        case DISPATCH_MENU:
            return { ...state, list: payload }
        default:
            return state;
    }
};