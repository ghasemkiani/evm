import d from "decimal.js";

import { cutil } from "@ghasemkiani/base";
import { ERC20 } from "./erc20.js";

import { Contract } from "./contract.js";

class Token extends Contract {
  static {
    cutil.extend(this.prototype, {
      _id: null,
      _address: null,
      decimals: null,
      name: null,
      symbol: null,
      fallbackToErc20Abi: false,
    });
  }
  fromString(string) {
    this.id = string;
  }
  get id() {
    if (!this._id && this._address) {
      this._id = this.chain.tokenId(this.address);
    }
    return this._id;
  }
  set id(id) {
    this._id = id;
  }
  get address() {
    if (!this._address && this._id) {
      this._address = this.chain.tokenAddress(this.id);
    }
    return this._address;
  }
  set address(address) {
    this._address = address;
  }
  async toGetAbi(abi) {
    let result;
    try {
      result = await super.toGetAbi(abi);
    } catch (e) {
      if (this.fallbackToErc20Abi) {
        result = this.abi = JSON.parse(JSON.stringify(ERC20));
      } else {
        throw e;
      }
    }
    return result;
  }
  async toUpdate() {
    await this.toGetAbi();
    await this.toGetSymbol();
    await this.toGetName();
    await this.toGetDecimals();
    return this;
  }
  async toUpdateDecimals() {
    await this.toGetDecimals();
    return this;
  }
  async toGetSymbol() {
    await this.toGetAbi();
    if (cutil.isNil(this.symbol)) {
      this.symbol = await this.toCallRead("symbol");
    }
    return this.symbol;
  }
  async toGetName() {
    await this.toGetAbi();
    if (cutil.isNil(this.name)) {
      this.name = await this.toCallRead("name");
    }
    return this.name;
  }
  async toGetDecimals() {
    await this.toGetAbi();
    try {
      if (cutil.isNil(this.decimals)) {
        this.decimals = await this.toCallRead("decimals");
      }
    } catch (e) {
      if (this.id in this.chain.tokenDecimals) {
        this.decimals = this.chain.tokenDecimals[this.id];
      } else {
        throw e;
      }
    }
    return this.decimals;
  }
  wrapNumber(n) {
    let { decimals } = this;
    if (cutil.isNil(decimals)) {
      throw new Error("Token decimals not set!");
    }
    return d(n)
      .mul(10 ** decimals)
      .toFixed(0);
  }
  unwrapNumber(s) {
    let { decimals } = this;
    if (cutil.isNil(decimals)) {
      throw new Error("Token decimals not set!");
    }
    return d(s)
      .mul(10 ** -decimals)
      .toNumber();
  }
  async toWrapNumber(n) {
    await this.toGetDecimals();
    return this.wrapNumber(n);
  }
  async toUnwrapNumber(s) {
    await this.toGetDecimals();
    return this.unwrapNumber(s);
  }
  async toGetTotalSupply_() {
    await this.toGetAbi();
    let totalSupply_ = await this.toCallRead("totalSupply");
    return totalSupply_;
  }
  async toGetTotalSupply() {
    await this.toGetDecimals();
    let totalSupply_ = await this.toGetTotalSupply_();
    let totalSupply = this.unwrapNumber(totalSupply_);
    return totalSupply;
  }
  async toGetBalanceOf_(address) {
    await this.toGetAbi();
    let balance_ = await this.toCallRead("balanceOf", address);
    return balance_;
  }
  async toGetBalanceOf(address) {
    await this.toGetDecimals();
    let balance_ = await this.toGetBalanceOf_(address);
    let balance = this.unwrapNumber(balance_);
    return balance;
  }
  async toGetAccountBalance_() {
    return await this.toGetBalanceOf_(this.account.address);
  }
  async toGetAccountBalance() {
    return await this.toGetBalanceOf(this.account.address);
  }
  async toTransfer_(to, amount_) {
    await this.toGetAbi();
    let result = await this.toCallWrite("transfer", to, amount_);
    return result;
  }
  async toTransfer(to, amount) {
    await this.toGetDecimals();
    let amount_ = this.wrapNumber(amount);
    return this.toTransfer_(to, amount_);
  }
  async toTransferFrom_(from, to, amount_) {
    await this.toGetAbi();
    let result = await this.toCallWrite("transferFrom", from, to, amount_);
    return result;
  }
  async toTransferFrom(from, to, amount) {
    await this.toGetDecimals();
    let amount_ = this.wrapNumber(amount);
    return this.toTransferFrom_(from, to, amount_);
  }
  async toApprove_(spender, amount_) {
    await this.toGetAbi();
    let result = await this.toCallWrite("approve", spender, amount_);
    return result;
  }
  async toApprove(spender, amount) {
    await this.toGetDecimals();
    let amount_ = this.wrapNumber(amount);
    return this.toApprove_(spender, amount_);
  }
  async toGetAllowance_(owner, spender) {
    await this.toGetAbi();
    let allowance_ = await this.toCallRead("allowance", owner, spender);
    return allowance_;
  }
  async toGetAllowance(owner, spender) {
    await this.toGetDecimals();
    let allowance_ = await this.toGetAllowance_(owner, spender);
    let allowance = this.unwrapNumber(allowance_);
    return allowance;
  }
  async toGetAccountAllowance_(spender) {
    let owner = this.account.address;
    let allowance_ = await this.toGetAllowance_(owner, spender);
    return allowance_;
  }
  async toGetAccountAllowance(spender) {
    let owner = this.account.address;
    let allowance = await this.toGetAllowance(owner, spender);
    return allowance;
  }
}

export { Token };
