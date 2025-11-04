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
      let {Contract} = this.chain.client;
      let { abi, address } = this;
      this._contract = new Contract(abi, address);
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
    let contract = this;
    let { chain } = contract;
    let { abi } = contract;
    let items;
    if (/\(/.test(nm)) {
      items = abi.filter(
        (item) =>
          item.type === "function" && nm === chain.getAbiItemSignature(item),
      );
    } else {
      items = abi.filter(
        (item) => item.type === "function" && nm === item.name,
      );
    }
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
    let { client } = this.chain;
    return client.functionData(func, ...rest);
  }
  callData(nm, ...rest) {
    let func = this.findFunction(nm);
    let data = this.functionData(func, ...rest);
    return data;
  }
  async toCallRead(method, ...rest) {
    let result = await this.contract.methods[method](...rest).call();
    // workaround to convert bigint values to string for the time being...
    const check = value => {
      if (cutil.isBigInt(value)) {
        value = value.toString();
      } else if (cutil.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          value[i] = check(value[i]);
        }
      } else if (cutil.isObject(value)) {
        for (let k of Object.keys(value)) {
          value[k] = check(value[k]);
        }
      }
      return value
    };
    return check(result);
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
  getDeployData(bytecode, args) {
    return this.contract.deploy({ data: bytecode, arguments: args }).encodeABI();
  }
  async toDeploy(bytecode, args) {
    data = this.getDeployData(bytecode, args);
    let result = await this.toSendData(data, value);
    return result;
  }
}

export { Contract };
