// vite.config.ts
import { TanStackRouterVite } from "file:///home/aimen/dataprotector-sdk/packages/demo/usecase-demo/node_modules/@tanstack/router-vite-plugin/dist/esm/index.js";
import react from "file:///home/aimen/dataprotector-sdk/packages/demo/usecase-demo/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { defineConfig, loadEnv } from "file:///home/aimen/dataprotector-sdk/packages/demo/usecase-demo/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/home/aimen/dataprotector-sdk/packages/demo/usecase-demo";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const basePath = env.SET_SUBPATH_FOR_PROD === "true" ? "/content-creator" : "/";
  console.log("[vite] Building with base path:", basePath);
  return {
    base: basePath,
    plugins: [react(), TanStackRouterVite()],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9haW1lbi9kYXRhcHJvdGVjdG9yLXNkay9wYWNrYWdlcy9kZW1vL3VzZWNhc2UtZGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvYWltZW4vZGF0YXByb3RlY3Rvci1zZGsvcGFja2FnZXMvZGVtby91c2VjYXNlLWRlbW8vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvYWltZW4vZGF0YXByb3RlY3Rvci1zZGsvcGFja2FnZXMvZGVtby91c2VjYXNlLWRlbW8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tICdAdGFuc3RhY2svcm91dGVyLXZpdGUtcGx1Z2luJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcbiAgLy8gSW4gcHJvZCwgYXBwIHdpbGwgYmUgc2VydmVkIHVuZGVyIGBkZW1vLmlleC5lYy9jb250ZW50LWNyZWF0b3JgIHBhdGhcbiAgY29uc3QgYmFzZVBhdGggPVxuICAgIGVudi5TRVRfU1VCUEFUSF9GT1JfUFJPRCA9PT0gJ3RydWUnID8gJy9jb250ZW50LWNyZWF0b3InIDogJy8nO1xuICBjb25zb2xlLmxvZygnW3ZpdGVdIEJ1aWxkaW5nIHdpdGggYmFzZSBwYXRoOicsIGJhc2VQYXRoKTtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBiYXNlUGF0aCxcbiAgICBwbHVnaW5zOiBbcmVhY3QoKSwgVGFuU3RhY2tSb3V0ZXJWaXRlKCldLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFYsU0FBUywwQkFBMEI7QUFDN1gsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLGNBQWMsZUFBZTtBQUh0QyxJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFFM0MsUUFBTSxXQUNKLElBQUkseUJBQXlCLFNBQVMscUJBQXFCO0FBQzdELFVBQVEsSUFBSSxtQ0FBbUMsUUFBUTtBQUN2RCxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDO0FBQUEsSUFDdkMsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
