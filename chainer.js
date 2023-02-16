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
	wtoken(arg) {
		let {chain} = this;
		let id = chain.wtok;
		arg = cutil.extend(Object(arg), {id});
		return cutil.assign(new Token(arg), {chain});
	},
	async toDecodeLog(log) {
		let {chain} = this;
		let {web3} = chain;
		let {address, topics, data} = log;
		let contract = this.contract({address});
		await contract.toGetAbi();
		let [signature, ...indexes] = topics;
		let event = contract.abi.find(item => item.signature === signature);
		let {inputs} = event;
		let decoded = web3.eth.abi.decodeLog(inputs, data, event.anonymous ? topics : indexes);
		return {event, address, decoded};
	}
});

export {chainer};
