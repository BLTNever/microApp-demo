// import { ResizeObserver } from '@juggle/resize-observer' // 兼容问题用这个，暂时不考虑
import { useEffect, useState } from 'react'

function useResize(dom: Element | null) {

    const [state, setState] = useState(() => {
        return {
            width: dom?.clientWidth,
            height: dom?.clientHeight
        }
    })
    useEffect(() => {
        if (!dom) return
        const targetElement = dom
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                setState({
                    width: entry.target.clientWidth,
                    height: entry.target.clientHeight
                })
            })
        })
        targetElement && resizeObserver.observe(targetElement)
        return () => resizeObserver.disconnect()
    }, [dom])

    return state
}

export default useResize
