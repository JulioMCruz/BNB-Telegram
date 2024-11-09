import { http, createConfig } from "wagmi";
import { opBNBTestnet } from "wagmi/chains";

export const config = createConfig({
  chains: [opBNBTestnet],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [opBNBTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
