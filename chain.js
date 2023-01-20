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
		let chain = arg;
		if (!(chain instanceof Chain)) {
			arg = cutil.asString(arg).toLowerCase();
			chain = (
				this.list.find(({symbol}) => symbol.toLowerCase() === arg)
				|| this.list.find(({name}) => name.toLowerCase() === arg)
				|| this.list.find(({tok}) => tok.toLowerCase() === arg)
				|| this.list.find(({id}) => cutil.asString(id) === arg)
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
	get symbol() {
		if (!this._symbol) {
			this._symbol = this.tok;
		}
		return this._symbol;
	}
	set symbol(symbol) {
		this._symbol = symbol;
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
}

const ethereum = Chain.add({
	id: 1,
	tok: "ETH",
	symbol: "eth",
	name: "Ethereum",
	defaultUrl: "https://rpc.ankr.com/eth",
	scanUrl: "https://api.etherscan.io/api",
});

const bnbchain = Chain.add({
	id: 56,
	tok: "BNB",
	symbol: "bsc",
	name: "BNB Smart Chain",
	defaultUrl: "https://rpc.ankr.com/bsc",
	scanUrl: "https://api.bscscan.com/api",
});

export {
	Chain,
	ethereum,
	bnbchain,
};
