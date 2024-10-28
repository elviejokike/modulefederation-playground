import { loadRemote } from "@module-federation/enhanced/runtime";
import { default as React, Suspense, lazy } from "react";
'react-dom'

async function lazyRemoteModule(module:string) {
  return loadRemote<{default: typeof React.Component}>(module) as Promise<{default: typeof React.Component}>
}

export function DynamicView(props:any) {
    let { name, module, componentName, ...restProps } = props;
  
    const View = lazy(() => {
        return lazyRemoteModule(module) 
    })

    return (
        <Suspense fallback="loading...">
            <View {...restProps}/>
        </Suspense>
    )
  }