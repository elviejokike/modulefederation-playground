import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';


export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'federation_provider',
      exposes: {
        './Comp1': './src/comp1.tsx',
        './Comp2': './src/comp2.tsx',
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } }
    }),
  ],
});
