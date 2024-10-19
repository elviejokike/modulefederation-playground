import { init } from '@module-federation/enhanced/runtime';

init({
    name: '@demo',
    remotes: [
      {
        name: "fed_provider",
        // mf-manifest.json is a file type generated in the new version of Module Federation build tools, providing richer functionality compared to remoteEntry
        // Preloading depends on the use of the mf-manifest.json file type
        entry: "http://localhost:3000/mf-manifest.json",
      }
    ],
  });

import('./bootstrap')