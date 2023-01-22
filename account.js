import d from "decimal.js";

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";

import {iwchain} from "./iwchain.js";
import {ERC20} from "./erc20.js";

class Account extends cutil.mixin(Obj, iwchain) {
	static {
		cutil.extend(this.prototype, {
			_address: null,
			key: null,
			_balances: null,
			_balances_: null,
		});
	}
	get address() {
		if(!this._address && this.key) {
			let web3 = this.chain.web3;
			let privateKey = this.key;
			this._address = web3.eth.accounts.privateKeyToAccount(privateKey).address;
		}
		return this._address;
	}
	set address(address) {
		this._address = address;
	}
	toChecksumAddress() {
		this.address = Web3.utils.toChecksumAddress(this.address);
		return this;
	}
	get balances_() {
		if(!this._balances_) {
			this._balances_ = {};
		}
		return this._balances_;
	}
	set balances_(balances_) {
		this._balances_ = balances_;
	}
	get balance_() {
		return this.balances_[this.chain.tok];
	}
	set balance_(balance_) {
		this.balances_[this.chain.tok] = balance_;
	}
	get balances() {
		if(!this._balances) {
			this._balances = {};
		}
		return this._balances;
	}
	set balances(balances) {
		this._balances = balances;
	}
	get balance() {
		return this.balances[this.chain.tok];
	}
	set balance(balance) {
		this.balances[this.chain.tok] = balance;
	}
	async toGetBalance_() {
		let account = this;
		let {chain} = account;
		let {web3} = chain;
		let {address} = account;
		let balance_ = await web3.eth.getBalance(address);
		account.balance_ = balance_;
		account.balance = chain.fromWei(balance_);
		return balance_;
	}
	async toGetBalance() {
		let account = this;
		await account.toGetBalance_();
		return account.balance;
	}
	async toGetTokenBalance_(tokenId) {
		let account = this;
		let balance_;
		if(tokenId === account.chain.tok) {
			balance_ = await account.toGetBalance_();
		} else {
			let {chain} = account;
			let {web3} = chain;
			let {address} = account;
			let id = tokenId;
			let abi = ERC20;
			let tokenAddress = chain.tokenAddressOrProxy(tokenId);
			if(!tokenAddress) {
				throw new Error(`Token '${token}' not found (contract address not defined)`);
			}
			let contract = new web3.eth.Contract(abi, tokenAddress);
			let decimals = await contract.methods["decimals"]().call();
			let balance_ = await contract.methods["balanceOf"](address).call();
			account.balances_[tokenId] = balance_;
			account.balances[tokenId] = d(balance_).mul(10 ** -decimals).toNumber();
		}
		return balance_;
	}
	async toGetTokenBalance(tokenId) {
		let account = this;
		let balance;
		if(tokenId === this.chain.tok) {
			balance = await this.toGetBalance();
		} else {
			await account.toGetTokenBalance_(tokenId);
			balance = this.balances[tokenId];
		}
		return balance;
	}
	async toTransfer({amount_, amount, toAddress}) {
		let web3 = this.chain.web3;
		let privateKey = this.key;
		return await this.chain.toTransfer({amount_, amount, toAddress, privateKey});
	}
	async toTransferToken({amount_, amount, token, toAddress}) {
		if(token === this.chain.tok) {
			return await this.toTransfer({amount_, amount, toAddress});
		} else {
			let web3 = this.chain.web3;
			let privateKey = this.key;
			let tokenAddress = this.chain.contracts[token];
			if(!tokenAddress) {
				throw new Error(`Token '${token}' not found (contract address not defined)`);
			}
			return await this.chain.toTransferToken({amount_, amount, tokenAddress, toAddress, privateKey});
		}
	}
	async toSignTransaction(options) {
		let privateKey = this.key;
		let signed = await this.chain.web3.eth.accounts.signTransaction(options, privateKey);
		return signed;
	}
	async toSendSignedTransaction(rawTransaction) {
		let receipt = await this.chain.web3.eth.sendSignedTransaction(rawTransaction);
		return receipt;
	}
	async toSend(options) {
		let {rawTransaction} = await this.toSignTransaction(options);
		let receipt = await this.toSendSignedTransaction(rawTransaction);
		return receipt;
	}
	async toDeploy(data) {
		let account = this;
		let {chain} = account;
		let {address} = account;
		let {web3} = chain;
		let from = address;
		let value = 0;
		let gasPrice = await chain.toGetGasPrice();
		let gas;
		try {
			gas = await web3.eth.estimateGas({from, data});
		} catch(e) {
			gas = chain.gasLimitMax;
		}
		let options = {value, gas, gasPrice, data};
		let receipt = await account.toSend(options);
		return receipt;
	}
}

export {Account};
