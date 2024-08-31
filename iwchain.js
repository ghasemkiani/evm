import { cutil } from "@ghasemkiani/base";

import { Chain } from "./chain.js";

const iwchain = {
  _chain: null,
  get chain() {
    if (!this._chain) {
      this._chain = Chain.get();
    }
    return this._chain;
  },
  set chain(chain) {
    if (cutil.isString(chain) || cutil.isNumber(chain)) {
      chain = Chain.get(chain);
    }
    this._chain = chain;
  },
};

export { iwchain };
