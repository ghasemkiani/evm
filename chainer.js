import {cutil} from "@ghasemkiani/base";

import {Account} from "./account.js";
import {Contract} from "./contract.js";
import {Token} from "./token.js";
import {Chain} from "./chain.js";
import {iwchain} from "./iwchain.js";

const chainer = cutil.extend({}, iwchain, {
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
});

export {chainer};
