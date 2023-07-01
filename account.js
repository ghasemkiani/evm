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
		this.address = this.chain.toChecksumAddress(this.address);
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
		let {chain} = account;
		let balance_;
		if(tokenId === chain.tok) {
			balance_ = await account.toGetBalance_();
		} else {
			let {web3} = chain;
			let {address} = account;
			let id = tokenId;
			let abi = ERC20;
			let tokenAddress = chain.tokenAddress(tokenId);
			if(!tokenAddress) {
				throw new Error(`Token '${token}' not found (contract address not defined)`);
			}
			let contract = new web3.eth.Contract(abi, tokenAddress);
			let decimals = await contract.methods["decimals"]().call();
			balance_ = await contract.methods["balanceOf"](address).call();
			account.balances_[tokenId] = balance_;
			account.balances[tokenId] = d(balance_).mul(10 ** -decimals).toNumber();
		}
		return balance_;
	}
	async toGetTokenBalance(tokenId) {
		let account = this;
		let {chain} = account;
		let balance;
		if(tokenId === chain.tok) {
			balance = await account.toGetBalance();
		} else {
			await account.toGetTokenBalance_(tokenId);
			balance = account.balances[tokenId];
		}
		return balance;
	}
	async toTransfer({amount_, amount, toAddress, gas, gasPrice}) {
		let account = this;
		let {chain} = account;
		if(cutil.isNil(gasPrice)) {
			if(cutil.isNil(chain.gasPrice)) {
				await chain.toGetGasPrice();
			}
			gasPrice = chain.gasPrice;
		}
		if(cutil.isNil(gas)) {
			gas = await chain.toGetGasLimit();
		}
		let value = cutil.isNil(amount_) ? chain.toWei(amount).toString() : amount_;
		let to = toAddress;
		let receipt = await account.toSend({to, value, gas, gasPrice});
		return receipt;
	}
	async toTransferToken({amount_, amount, tokenId, toAddress, gas, gasPrice}) {
		let account = this;
		let {chain} = account;
		let receipt;
		if(tokenId === chain.tok) {
			receipt = await account.toTransfer({amount_, amount, toAddress, gas, gasPrice});
		} else {
			let {web3} = chain;
			let {address} = account;
			let id = tokenId;
			let abi = ERC20;
			let tokenAddress = chain.tokenAddress(tokenId);
			if(!tokenAddress) {
				throw new Error(`Token '${token}' not found (contract address not defined)`);
			}
			let contract = new web3.eth.Contract(abi, tokenAddress);
			let decimals = await contract.methods["decimals"]().call();
			if (cutil.na(amount_)) {
				amount_ = d(amount).mul(10 ** decimals).toFixed(0);
			}
			let data = contract.methods["transfer"](toAddress, amount_).encodeABI();
			let value = 0;
			let to = tokenAddress;
			if(cutil.isNil(gasPrice)) {
				if(cutil.isNil(chain.gasPrice)) {
					await chain.toGetGasPrice();
				}
				gasPrice = chain.gasPrice;
			}
			if(cutil.isNil(gas)) {
				gas = await chain.toEstimateGas({to, value, data});
			}
			receipt = await account.toSend({to, value, data, gas, gasPrice});
		}
		return receipt;
	}
	async toSignTransaction(transactionObject) {
		let account = this;
		let {chain} = account;
		let {key} = account;
		let {web3} = chain;
		let result = await web3.eth.accounts.signTransaction(transactionObject, key);
		console.log(`Signing tx:\n${result.transactionHash}`);
		// console.log(JSON.stringify(result, null, "\t"));
		return result;
	}
	async toSendSignedTransaction(rawTransaction) {
		let account = this;
		let {chain} = account;
		try {
			let receipt = await chain.toSendSignedTransaction(rawTransaction);
			return receipt;
		} catch(e) {
			console.log(`Failed to send rawTransaction:`);
			console.log(rawTransaction);
			throw e;
		}
	}
	async toSend(options) {
		console.log(`Sending tx:\nfrom:\n${options.from}\nto:\n${options.to}\ngas:\n${options.gas}\ngasPrice:\n${d(options.gasPrice).div(1e9).toFixed(9)} GWei\ndata:\n${options.data ? "..." : "--"}`);
		let {rawTransaction, transactionHash} = await this.toSignTransaction(options);
		let receipt = await this.toSendSignedTransaction(rawTransaction);
		return {hash: transactionHash, ...receipt};
	}
	async toDeploy(data) {
		let account = this;
		let {chain} = account;
		let {address} = account;
		let from = address;
		let value = 0;
		let gasPrice = await chain.toGetGasPrice();
		let gas = await chain.toEstimateGas({value, from, data});
		let receipt = await account.toSend({value, from, data, gas, gasPrice});
		return receipt;
	}
	async toGetTransactionCount(defaultBlock = "latest") {
		let account = this;
		let {chain} = account;
		let {address} = account;
		let transactionCount = await chain.toGetTransactionCount(address, defaultBlock);
		return transactionCount;
	}
	async toSign(dataToSign) {
		let account = this;
		let {chain} = account;
		let {web3} = chain;
		let {address} = account;
		let signedData = await web3.eth.sign(dataToSign, address);
		return signedData;
	}
}

export {Account};
