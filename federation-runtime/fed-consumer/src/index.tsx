import { init } from '@module-federation/enhanced/runtime';

init({
  name: "fed_consumer",
  remotes: [
    {
      name: "fed_provider",  //primitives
      alias: 'fed_provider',
      entry: "http://localhost:3000/mf-manifest.json",
      shareScope: 'default'
    }
  ]
  }
);

import('./bootstrap')