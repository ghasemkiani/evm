import { cutil } from "@ghasemkiani/base";

import { Account } from "./account.js";

class Contract extends Account {
  static {
    cutil.extend(this.prototype, {
      _abi: null,
      account: null,
      _contract: null,
    });
  }
  get abi() {
    return this._abi;
  }
  set abi(abi) {
    abi = this.chain.addSignatures(abi);
    this._abi = abi;
  }
  async toGetAbi(abi) {
    if (!this.abi) {
      let address = this.address;
      if (this.chain.toChecksumAddress(address) in this.chain.contractProxies) {
        address =
          this.chain.contractProxies[this.chain.toChecksumAddress(address)];
      }
      try {
        this.abi = await this.chain.scan.toGetContractAbi(address);
      } catch (e) {
        if (abi) {
          this.abi = abi;
        } else {
          throw e;
        }
      }
    }
    return this.abi;
  }
  async toRemoveAbiFromCache() {
    let address = this.address;
    let result = await this.chain.scan.toRemoveContractAbiFromCache(address);
    if (this.chain.toChecksumAddress(address) in this.chain.contractProxies) {
      address =
        this.chain.contractProxies[this.chain.toChecksumAddress(address)];
      result = await this.chain.scan.toRemoveContractAbiFromCache(address);
    }
    return result;
  }
  get contract() {
    if (!this._contract) {
      let web3 = this.chain.web3;
      let { abi, address } = this;
      this._contract = new web3.eth.Contract(abi, address);
    }
    return this._contract;
  }
  set contract(contract) {
    this._contract = contract;
  }
  async toSendData(data, value = 0) {
    let contract = this;
    let { account } = contract;
    let { chain } = contract;
    let { web3 } = chain;
    let to = contract.address;
    let gasPrice = await chain.toGetGasPrice();
    let gas;
    try {
      gas = await contract.toEstimateGas(data);
    } catch (e) {
      gas = chain.gasLimitMax;
    }
    let options = { to, value, gas, gasPrice, data };
    let receipt = await account.toSend(options);
    return receipt;
  }
  findFunction(nm, index = 0) {
    let { abi } = this;
    let items;
    if (/\(/.test(nm)) {
      items = abi.filter(({ type, name, inputs }) => {
        let sig = `${name}(${(inputs || []).map(({ type, components }) => (type !== "tuple" ? type : `(${components.map(({ type }) => type).join(",")})`)).join(",")})`;
        return type === "function" && nm === sig;
      });
    } else {
      items = abi.filter(({ type, name }) => {
        return type === "function" && nm === name;
      });
    }
    // let items = abi.filter(({type, name, inputs}) => type === "function" && name === nm && (!types || (inputs.length === types.length && inputs.every(({type}, i) => type === types[i]))));
    return items[index];
  }
  findEvent(nm, index = 0) {
    let { abi } = this;
    let types;
    let result = /^([^(]+)\(([^)]*)\)$/.exec(nm);
    if (result) {
      nm = result[1];
      types = result[2].split(",");
    }
    let items = abi.filter(
      ({ type, name, inputs }) =>
        type === "event" &&
        name === nm &&
        (!types ||
          (inputs.length === types.length &&
            inputs.every(({ type }, i) => type === types[i]))),
    );
    return items[index];
  }
  functionData(func, ...rest) {
    let { web3 } = this.chain;
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

export { Contract };
