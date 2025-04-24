import { cutil } from "@ghasemkiani/base";

import { Chain } from "./chain.js";
import { chainer } from "./chainer.js";

const iwchainApp = cutil.extend(chainer, {
  // network: null,
  defaultPrefsIWChainApp: {
    //
  },
  async toDefineInitOptionsIWChainApp() {
    let app = this;
  },
  async toApplyInitOptionsIWChainApp() {
    let app = this;
    let { network } = app;
    Chain.set(network);
  },
});

export { iwchainApp };
