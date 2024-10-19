// import ProviderButton from 'fed_provider/button';
import { loadRemote } from '@module-federation/enhanced/runtime';
import React, { Suspense, lazy } from 'react';
import './App.css';

// const ProviderButton = lazy(
// 	// @ts-ignore
// 	async () => import('fed_provider/button'),
// );
const view = "fed_provider/Comp2"
const ProviderButton = lazy(() => {
    return loadRemote<{default: typeof React.Component}>(view) as Promise<{default: typeof React.Component}>
});

const  props = {
  color: 'blue',
  fontSize: '20px'
}

const App = () => {
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <Suspense fallback="loading...">
				<ProviderButton {...props}/>
			</Suspense>
    </div>
  );
};

export default App;
