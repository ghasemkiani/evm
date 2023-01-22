import d from "decimal.js";
import Web3 from "web3";

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";
import {Client as Scan} from "@ghasemkiani/etherscan-api";

class Chain extends Obj {
	static {
		cutil.extend(this.prototype, {
			_symbol: null,
			defaultUrl: null,
			_urlEnvName: null,
			_scanUrlEnvName: null,
			_url: null,
			_scanUrl: null,
			name: null,
			id: null,
			tok: null,
			Scan,
			_scan: null,
			_web3: null,
			
			_addressWTok: null,
			addressZero: "0x0000000000000000000000000000000000000000",
			
			_contracts: null,
			_contractProxies: null,
			
			gasPrice: null,
			gasLimit: null,
			gasLimitMax: 500000,
			gasLimitK: 1,
			gasPriceK: 1,
		});
	}
	static def = null;
	static list = [];
	static add(...rest) {
		let [chain] = rest;
		if (!(chain instanceof Chain)) {
			chain = new Chain(...rest);
		}
		this.list.push(chain);
		return chain;
	}
	static get(arg) {
		let Chain = this;
		let chain;
		if (cutil.isNil(arg)) {
			chain = Chain.def;
		} else if (arg instanceof Chain) {
			chain = arg;
		} else {
			arg = cutil.asString(arg).toLowerCase();
			chain = (
				Chain.list.find(({symbol}) => symbol.toLowerCase() === arg)
				|| Chain.list.find(({name}) => name.toLowerCase() === arg)
				|| Chain.list.find(({tok}) => tok.toLowerCase() === arg)
				|| Chain.list.find(({id}) => cutil.asString(id) === arg)
			);
		}
		return chain;
	}
	static set(...rest) {
		Chain.def = Chain.get(...rest) || Chain.add(...rest);
		return Chain.def;
	}
	static async toGetInjected() {
		let chain;
		let global = cutil.global();
		if ("window" in global) {
			let {window} = global;
			if ("ethereum" in window) {
				let {ethereum} = window;
				let web3 = new Web3(ethereum);
				let id = await web3.eth.getChainId();
				chain = Chain.get(id) || new Chain({id});
				chain.web3 = web3;
			}
		}
		return chain;
	}
	get contracts() {
		if (!this._contracts) {
			this._contracts = {};
		}
		return this._contracts;
	}
	set contracts(contracts) {
		this._contracts = contracts;
	}
	get contractProxies() {
		if (!this._contractProxies) {
			this._contractProxies = {};
		}
		return this._contractProxies;
	}
	set contractProxies(contractProxies) {
		this._contractProxies = contractProxies;
	}
	get urlEnvName() {
		if (!this._urlEnvName) {
			this._urlEnvName = `${this.symbol.toUpperCase()}_NODE`;
		}
	}
	set urlEnvName(urlEnvName) {
		this._urlEnvName = urlEnvName;
	}
	get scanUrlEnvName() {
		if (!this._scanUrlEnvName) {
			this._scanUrlEnvName = `${this.symbol.toUpperCase()}_SCAN_URL`;
		}
	}
	set scanUrlEnvName(scanUrlEnvName) {
		this._scanUrlEnvName = scanUrlEnvName;
	}
	get scanTokenEnvName() {
		if (!this._scanTokenEnvName) {
			this._scanTokenEnvName = `${this.symbol.toUpperCase()}_SCAN_TOKEN`;
		}
	}
	set scanTokenEnvName(scanTokenEnvName) {
		this._scanTokenEnvName = scanTokenEnvName;
	}
	get url() {
		if(!this._url) {
			this._url = process.env[this.urlEnvName] || this.defaultUrl;
		}
		return this._url;
	}
	set url(url) {
		this._url = url;
	}
	get scanUrl() {
		if(!this._scanUrl) {
			this._scanUrl = process.env[this.scanUrlEnvName];
		}
		return this._scanUrl;
	}
	set scanUrl(scanUrl) {
		this._scanUrl = scanUrl;
	}
	get scanToken() {
		if(!this._scanToken) {
			this._scanToken = process.env[this.scanTokenEnvName];
		}
		return this._scanToken;
	}
	set scanToken(scanToken) {
		this._scanToken = scanToken;
	}
	get scan() {
		if (!this._scan) {
			let {Scan} = this;
			this._scan = new Scan({
				endpoint: this.scanUrl,
				apiKeyToken: this.scanToken,
				cacheName: this.symbol,
			});
		}
		return this._scan;
	}
	set scan(scan) {
		this._scan = scan;
	}
	get web3() {
		if (!this._web3) {
			this._web3 = new Web3(this.url);
		}
		return this._web3;
	}
	set web3(web3) {
		this._web3 = web3;
	}
	
	get wtok() {
		if (!this._wtok) {
			this._wtok = "W" + this.tok;
		}
		return this._wtok;
	}
	set wtok(wtok) {
		this._wtok = wtok;
	}
	get addressWTok() {
		if (!this._addressWTok) {
			this._addressWTok = this.tokenAddress(this.wtok);
		}
		return this._addressWTok;
	}
	set addressWTok(addressWTok) {
		this._addressWTok = addressWTok;
	}
	isWTok(token) {
		return this.eq(this.addressWTok, token) || this.eq(this.addressWTok, token?.address);
	}
	async toGetGasPrice() {
		let web3 = this.web3;
		let gasPrice = await web3.eth.getGasPrice();
		gasPrice = d(gasPrice).mul(this.gasPriceK).toFixed(0);
		gasPrice = cutil.asInteger(gasPrice);
		this.gasPrice = gasPrice;
		return gasPrice;
	}
	async toGetGasLimit() {
		let web3 = this.web3;
		let gasLimit = (await web3.eth.getBlock("latest")).gasLimit;
		gasLimit = cutil.asNumber(gasLimit);
		gasLimit = d(gasLimit).mul(this.gasLimitK).toFixed(0);
		gasLimit = cutil.asInteger(gasLimit);
		if(gasLimit > this.gasLimitMax) {
			gasLimit = this.gasLimitMax;
		}
		this.gasLimit = gasLimit;
		return gasLimit;
	}
	fromWei(value) {
		let amount = Web3.utils.fromWei(cutil.asString(value), "ether");
		return cutil.asNumber(amount);
	}
	toWei(amount) {
		let value = Web3.utils.toWei(cutil.asNumber(amount), "ether");
		return value;
	}
	async toGetBlockNumber() {
		let {web3} = this;
		let blockNumber = await web3.eth.getBlockNumber();
		return blockNumber;
	}
	async toGetBlock(blockNumber) {
		let {web3} = this;
		let block = await web3.eth.getBlock(blockNumber);
		return block;
	}
	async toGetBlockTimeSec(n = 10000) {
		let {web3} = this;
		let currentBlock = await this.toGetBlockNumber();
		let {timestamp: timestamp1} = await this.toGetBlock(currentBlock);
		let {timestamp: timestamp0} = await this.toGetBlock(currentBlock - n);
		let blockTimeSec = (cutil.asNumber(timestamp1) - cutil.asNumber(timestamp0)) / n;
		return blockTimeSec;
	}
	async toGetTransactionFee() {
		let gas = await this.toGetGasLimit();
		let gasPrice = await this.toGetGasPrice();
		let fee = gasPrice * gas;
		return {gas, gasPrice, fee};
	}
	tokenAddress(tokenId) {
		return this.contracts[tokenId];
	}
	tokenId(tokenAddress) {
		let tokId;
		tokenAddress = cutil.asString(tokenAddress).toLowerCase();
		for(let k of Object.keys(this.contracts)) {
			let tokAddress = this.contracts[k];
			if(tokAddress.toLowerCase() === tokenAddress) {
				tokId = k;
			}
		}
		return tokId;
	}
	tokenAddressOrProxy(tokenId) {
		let address = tokenId(tokenAddress);
		if (address in this.contractProxies) {
			address = this.contractProxies[address];
		}
		return address;
	}
	eq(address1, address2) {
		return cutil.asString(address1).toLowerCase() === cutil.asString(address2).toLowerCase();
	}
}

export {Chain};
