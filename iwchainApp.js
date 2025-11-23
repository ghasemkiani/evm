import { cutil } from "@ghasemkiani/base";

import { Chain } from "./chain.js";
import { chainer } from "./chainer.js";

const iwchainApp = cutil.extend(chainer, {
  // network: null,
  defaultPrefsIWChainApp: {
    gasLimitMax: null,
    gasLimitK: null,
    gasPriceK: null,
  },
  needs0x: true,
  async toDefineInitOptionsIWChainApp() {
    let app = this;
    app.commander.option(
      "--set-gas-limit-max <gasLimitMax>",
      "set gas limit max persistently",
    );
    app.commander.option(
      "--set-gas-limit-k <gasLimitK>",
      "set gas limit K persistently",
    );
    app.commander.option(
      "--set-gas-price-k <gasPriceK>",
      "set gas price K persistently",
    );
    app.commander.option("--gas-limit-max <gasLimitMax>", "gas limit max");
    app.commander.option("--gas-limit-k <gasLimitK>", "gas limit K");
    app.commander.option("--gas-price-k <gasPriceK>", "gas price K");
  },
  async toApplyInitOptionsIWChainApp() {
    let app = this;
    let { network } = app;
    Chain.set(network);
    
    let { chain } = app;
    let { prefs } = app;
    let opts = app.commander.opts();
    
    if (cutil.a(prefs.gasLimitMax)) {
      chain.gasLimitMax = cutil.asInteger(prefs.gasLimitMax);
    }
    if (cutil.a(prefs.gasLimitK)) {
      chain.gasLimitK = cutil.asNumber(prefs.gasLimitK);
    }
    if (cutil.a(prefs.gasPriceK)) {
      chain.gasPriceK = cutil.asNumber(prefs.gasPriceK);
    }

    if (cutil.a(opts.setGasLimitMax)) {
      prefs.gasLimitMax = cutil.asInteger(opts.setGasLimitMax);
      chain.gasLimitMax = cutil.asInteger(opts.setGasLimitMax);
    }
    if (cutil.a(opts.setGasLimitK)) {
      prefs.gasLimitK = cutil.asNumber(opts.setGasLimitK);
      chain.gasLimitK = cutil.asNumber(opts.setGasLimitK);
    }
    if (cutil.a(opts.setGasPriceK)) {
      prefs.gasPriceK = cutil.asNumber(opts.setGasPriceK);
      chain.gasPriceK = cutil.asNumber(opts.setGasPriceK);
    }

    if (cutil.a(opts.gasLimitMax)) {
      chain.gasLimitMax = cutil.asInteger(opts.gasLimitMax);
    }
    if (cutil.a(opts.gasLimitK)) {
      chain.gasLimitK = cutil.asNumber(opts.gasLimitK);
    }
    if (cutil.a(opts.gasPriceK)) {
      chain.gasPriceK = cutil.asNumber(opts.gasPriceK);
    }
    
    if (app.verbose) {
      console.log(`chain.gasLimitMax: ${chain.gasLimitMax}`);
      console.log(`chain.gasPriceK: ${chain.gasPriceK}`);
      console.log(`chain.gasLimitK: ${chain.gasLimitK}`);
    }
  },
  async toShowInfoIWChainApp() {
    let app = this;
    let { account } = app;
    let { chain } = app;
    console.log(`chain: ${chain.name} (${chain.symbol})`);
    console.log(`address: ${account?.address}`);
  },
});

export { iwchainApp };
