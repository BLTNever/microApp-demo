import React from 'react';

// @ts-ignore
// lifecycles
const eventLifeCycles = ['oncreated', 'onbeforemount', 'onmounted', 'onunmount', 'onerror', 'ondatachange'];
function jsxCustomEvent(type: any, props: any, ...children: any) {
    const newProps = Object.assign({}, props);
    if (/^micro-app(-\S+)?/.test(type) && props) {
        // ref will call when create, update, unmount
        newProps.ref = (element: any) => {
            if (typeof props.ref === 'function') {
                props.ref(element);
            }
            else if (typeof props.ref === 'object') {
                props.ref.current = element;
            }
            // when unmount and update the element is null
            if (element) {
                // Update data when the prev and next data are different
                if (toString.call(props.data) === '[object Object]' && element.data !== props.data) {
                    element.data = props.data;
                }
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key) &&
                        eventLifeCycles.includes(key.toLowerCase()) &&
                        typeof props[key] === 'function' &&
                        (!element[key] || element[key] !== props[key])) {
                        const eventName = key.toLowerCase().replace('on', '');
                        if (element[key]) {
                            // @ts-ignore
                            element.removeEventListener(eventName, element[key], false);
                        }
                        // @ts-ignore
                        element.addEventListener(eventName, props[key], false);
                        element[key] = props[key];
                    }
                }
            }
        };
    }
    return React.createElement.apply(null, [type, newProps, ...children]);
}

export default jsxCustomEvent;
//# sourceMappingURL=jsx-custom-event.js.map
