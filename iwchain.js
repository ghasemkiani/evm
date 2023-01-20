import {cutil} from "@ghasemkiani/base";

import {Account} from "./account.js";
import {Contract} from "./contract.js";
import {Token} from "./token.js";
import {chain as ethereum} from "./ethereum.js";

const iwchain = {
	_chain: null,
	get chain() {
		if (!this._chain) {
			this._chain = ethereum;
		}
		return this._chain;
	},
	set chain(chain) {
		this._chain = chain;
	},
	account(...rest) {
		let {chain} = this;
		return cutil.assign(new Account(...rest), {chain});
	},
	contract(...rest) {
		let {chain} = this;
		return cutil.assign(new Contract(...rest), {chain});
	},
	token(...rest) {
		let {chain} = this;
		return cutil.assign(new Token(...rest), {chain});
	},
};

export {iwchain};
