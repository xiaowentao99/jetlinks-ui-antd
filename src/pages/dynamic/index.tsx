import React, { useState } from "react";
var antd = require('./components/index.jsx');
import _ from 'lodash';
import NativeListener from 'react-native-listener';
import { Button } from "antd";
import data from "./data";


interface Props { }
interface State {
    dependComponents: any[],
    comNowIndex: number,
    indent_space: string,
    draggingData: any,
    data: [{
        type: string,
        title: string,
        can_place: boolean,
        props: {
            style: {
                paddingBottom: string,
                background: string
            }
        },
    }]
}

const Dynamic: React.FC<Props> = props => {
    const initState: State = {
        dependComponents: [],
        comNowIndex: 0,
        indent_space: '',
        draggingData: null,
        data: [{
            type: 'Layout',
            title: '布局块',
            can_place: true,
            props: {
                style: {
                    paddingBottom: '100px',
                    background: "#fff"
                }
            },
        }]
    };
    const [comNowIndex, setComNowIndex] = useState(initState.comNowIndex);
    const [dependComponents, setDependComponents] = useState(initState.dependComponents);
    const [draggingData, setDraggingData] = useState(initState.draggingData);

    const _getComponent = (types: any): any => {
        if (types.length == 1) {
            return antd[types[0]]
        } else {
            let lastT = types.pop();
            return _getComponent(types)[lastT];
        }
    }

    const findCanDropTarget = (target: any): any => {
        if (target.className.indexOf('draggable') != -1) {
            return target;
        } else {
            return findCanDropTarget(target.parentNode);
        }
    }

    console.log(antd, 'ants');
    const renderJson = (data: any) => {
        return (
            data.map((d, i) => {
                // console.log(d, '渲染');
                const { type, childrens, title, props } = d;
                // console.log('组件', type);
                if (childrens) {
                    renderJson(childrens);
                }
                // if (antd[type] === 'Switch') {
                // }
                return React.createElement(antd[type] || 'div', { key: d.id, ...props }, childrens ? renderJson(childrens) : props.content);

                // let tempComNowIndex = comNowIndex;
                // d.id = setComNowIndex(tempComNowIndex++);
                // if (d.hasDelete) return;

                // let component;
                // if (d.is_native) {
                //     component = d.type;
                // } else {
                //     component = _getComponent(d.type.split('.'));
                //     setDependComponents([...dependComponents, d.type.split('.')[0]]);
                // }

                // let temProps: any = {};

                // if (d.can_place) {
                //     temProps.className = 'draggable';
                //     temProps.onDragOver = (e: any) => {
                //         e.preventDefault();
                //     };
                //     temProps.onDrop = (e: any) => {
                //         e.preventDefault();
                //         e.stopPropagation();
                //         findCanDropTarget(e.target).className = findCanDropTarget(e.target).className.replace('isdroping', '');
                //         let com = draggingData;
                //         d.childrens = d?.childrens || [];
                //         d.childrens.push(_.cloneDeep(com));
                //         // todo forceUpdate();
                //     };
                //     temProps.onDragOver = (e: any) => {
                //         e.preventDefault();
                //         if (findCanDropTarget(e.target).className.indexOf('isdroping') == -1) {
                //             findCanDropTarget(e.target).className += (' isdroping')
                //         }
                //     }
                //     temProps.onDragLeave = (e: any) => {
                //         e.preventDefault();
                //         findCanDropTarget(e.target).className = findCanDropTarget(e.target).className.replace('isdroping', '');
                //     }
                // }

                // let outerProps: any = {};
                // d.props = d.props || {};
                // let realProps = Object.assign({}, d.props);
                // for (let i in realProps) {
                //     if (typeof (realProps[i]) == 'object' && realProps[i].type == 'relative') {
                //         realProps[i] = realProps[realProps[i].target] ? realProps[i].true : realProps[i].false;
                //     }
                // }

                // if (d.wrap_inner) {
                //     return (
                //         <NativeListener {...outerProps}>
                //             {React.createElement(
                //                 component,
                //                 realProps,
                //                 [<div {...temProps} style={{ width: "100%", height: "100%", minHeight: 20, minWidth: 20 }}>
                //                     {
                //                         d.props.content ? [d.props.content] : (d.childrens && renderJson(d.childrens))
                //                     }
                //                 </div>]
                //             )}
                //         </NativeListener>
                //     )
                // } else if (d.wrap) {
                //     return (
                //         <NativeListener {...outerProps}>
                //             <div {...props} style={{ width: "100%", height: "100%", minHeight: 20, minWidth: 20 }}>
                //                 {React.createElement(
                //                     component,
                //                     realProps,
                //                     d.props.content ? [d.props.content] : (d.childrens && renderJson(d.childrens))
                //                 )}
                //             </div>
                //         </NativeListener>
                //     )
                // } else {
                //     Object.assign(realProps, props);
                //     return <NativeListener {...outerProps}>
                //         {React.createElement(
                //             component,
                //             realProps,
                //             d.props.content ? [d.props.content] : (d.childrens && renderJson(d.childrens))
                //         )}
                //     </NativeListener>
                // }
            })
        )
    }
    return (
        <div className="preview">
            <div style={{ marginRight: '400' }}>
                {renderJson(data)}
            </div>
        </div >
    )
}
export default Dynamic;