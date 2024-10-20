import { init, loadRemote } from "@module-federation/enhanced/runtime";
import React, { Suspense, lazy } from "react";

async function lazyRemoteModule(module:string) {
  
  init({
    name: "@views",
    remotes: [
      {
        name: "fed_provider",  //primitives
        entry: "http://localhost:3000/mf-manifest.json"
      }
    ]
  });

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