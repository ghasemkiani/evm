import {cchain} from "@ghasemkiani/base";

import {Account} from "./account.js";

class Contract extends Account {
	static {
		cchain.extend(this.prototype, {
			abi: null,
			account: null,
		});
	}
	async toGetAbi() {
		if(!this.abi) {
			let address = this.address;
			if(address in this.chain.contractProxies) {
				address = this.chain.contractProxies[address];
			}
			this.abi = await this.scan.toGetContractAbi(address);
		}
		return this.abi;
	}
	async toRemoveAbiFromCache() {
		let address = this.address;
		let result = this.scan.toRemoveContractAbiFromCache(address);
		return result;
	}
	_contract: null,
	get contract() {
		if(!this._contract) {
			let web3 = this.chain.web3;
			let {abi, address} = this;
			this._contract = new web3.eth.Contract(abi, address);
		}
		return this._contract;
	}
	set contract(contract) {
		this._contract = contract;
	}
	async toSendData(data, value = 0) {
		let contract = this;
		let {account} = contract;
		let {chain} = contract;
		let {web3} = chain;
		let to = contract.address;
		let gasPrice = await chain.toGetGasPrice();
		let gas;
		try {
			gas = await contract.toEstimateGas(data);
		} catch(e) {
			gas = chain.gasLimitMax;
		}
		let options = {to, value, gas, gasPrice, data};
		console.log(options);
		let receipt = await account.toSend(options);
		return receipt;
	}
	findFunction(nm, index = 0) {
		let {abi} = this;
		let items = abi.filter(({type, name}) => type === "function" && name === nm);
		return items[index];
	}
	findEvent(nm, index = 0) {
		let {abi} = this;
		let items = abi.filter(({type, name}) => type === "event" && name === nm);
		return items[index];
	}
	functionData(func, ...rest) {
		let {web3} = this.chain;
		let data = web3.eth.abi.encodeFunctionCall(func, rest);
		return data;
	}
	callData(nm, ...rest) {
		let func = this.findFunction(nm);
		let data = this.functionData(func, ...rest);
		return data;
	}
	async toCallRead(method, ...rest) {
		let result = await this.contract.methods[method](...rest).call();
		return result;
	}
	async toCallWriteWithValue(value, method, ...rest) {
		let data = await this.contract.methods[method](...rest).encodeABI();
		let result = await this.toSendData(data, value);
		return result;
	}
	async toCallWrite(method, ...rest) {
		let value = 0;
		let result = await this.toCallWriteWithValue(value, method, ...rest);
		return result;
	}
}

export {Contract};
