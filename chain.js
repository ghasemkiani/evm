import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";
import { d } from "@ghasemkiani/decimal";
import { Client as Scan } from "@ghasemkiani/etherscan-api";
import { Client, iwclient } from "@ghasemkiani/web3";

class Chain extends cutil.mixin(Obj, iwclient) {
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
      _provider: null,

      _addressWTok: null,
      addressZero: "0x0000000000000000000000000000000000000000",
      addressOne: "0x0000000000000000000000000000000000000001",
      addressTwo: "0x0000000000000000000000000000000000000002",

      _contracts: null,
      _contractProxies: null,
      _tokenDecimals: null,

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
      chain =
        Chain.list.find(({ symbol }) => symbol.toLowerCase() === arg) ||
        Chain.list.find(({ name }) => name.toLowerCase() === arg) ||
        Chain.list.find(({ tok }) => tok.toLowerCase() === arg) ||
        Chain.list.find(({ id }) => cutil.asString(id) === arg);
    }
    return chain;
  }
  static set(...rest) {
    Chain.def = Chain.get(...rest) || Chain.add(...rest);
    return Chain.def;
  }
  get provider() {
    if (cutil.na(this._provider)) {
      this._provider = this.url;
    }
    return this._provider;
  }
  set provider(provider) {
    this._provider = provider;
  }
  static async toGetInjected() {
    let chain;
    let global = cutil.global();
    if ("window" in global) {
      let { window } = global;
      if ("ethereum" in window) {
        let { ethereum: provider } = window;
        let id = await Client.create(provider).eth.getChainId();
        chain = Chain.get(id) || new Chain({ id });
        chain.provider = provider;
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
  get tokenDecimals() {
    if (!this._tokenDecimals) {
      this._tokenDecimals = {};
    }
    return this._tokenDecimals;
  }
  set tokenDecimals(tokenDecimals) {
    this._tokenDecimals = tokenDecimals;
  }
  get urlEnvName() {
    if (!this._urlEnvName) {
      this._urlEnvName = `${this.symbol.toUpperCase()}_NODE`;
    }
    return this._urlEnvName;
  }
  set urlEnvName(urlEnvName) {
    this._urlEnvName = urlEnvName;
  }
  get scanUrlEnvName() {
    if (!this._scanUrlEnvName) {
      this._scanUrlEnvName = `${this.symbol.toUpperCase()}_SCAN_URL`;
    }
    return this._scanUrlEnvName;
  }
  set scanUrlEnvName(scanUrlEnvName) {
    this._scanUrlEnvName = scanUrlEnvName;
  }
  get scanTokenEnvName() {
    if (!this._scanTokenEnvName) {
      this._scanTokenEnvName = `${this.symbol.toUpperCase()}_SCAN_TOKEN`;
    }
    return this._scanTokenEnvName;
  }
  set scanTokenEnvName(scanTokenEnvName) {
    this._scanTokenEnvName = scanTokenEnvName;
  }
  get url() {
    if (!this._url) {
      this._url = process.env[this.urlEnvName] || this.defaultUrl;
    }
    // console.log(this._url);
    return this._url;
  }
  set url(url) {
    this._url = url;
  }
  get scanUrl() {
    if (!this._scanUrl) {
      this._scanUrl = process.env[this.scanUrlEnvName];
    }
    return this._scanUrl;
  }
  set scanUrl(scanUrl) {
    this._scanUrl = scanUrl;
  }
  get scanToken() {
    if (!this._scanToken) {
      this._scanToken = process.env[this.scanTokenEnvName];
    }
    return this._scanToken;
  }
  set scanToken(scanToken) {
    this._scanToken = scanToken;
  }
  get scan() {
    if (!this._scan) {
      let { Scan } = this;
      this._scan = new Scan({
        endpoint: this.scanUrl,
        apiKeyToken: this.scanToken,
        cacheName: this.symbol,
        chainId: this.id,
      });
    }
    return this._scan;
  }
  set scan(scan) {
    this._scan = scan;
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
  isTok(tokenId) {
    return cutil.asString(tokenId) === this.tok;
  }
  isWTok(token) {
    return (
      this.eq(this.addressWTok, token) ||
      this.eq(this.addressWTok, token?.address) ||
      this.eq(this.addressWTok, this.tokenAddress(token))
    );
  }
  async toGetGasPrice() {
    let chain = this;
    let { client } = chain;
    let gasPrice = await client.toGetGasPrice();
    gasPrice = d(gasPrice).mul(chain.gasPriceK).toFixed(0);
    gasPrice = cutil.asInteger(gasPrice);
    chain.gasPrice = gasPrice;
    return gasPrice;
  }
  async toGetGasLimit() {
    let chain = this;
    let { client } = chain;
    let { gasLimit } = await client.toGetBlock("latest");
    gasLimit = cutil.asNumber(gasLimit);
    gasLimit = d(gasLimit).mul(chain.gasLimitK).toFixed(0);
    gasLimit = cutil.asInteger(gasLimit);
    if (gasLimit > chain.gasLimitMax) {
      gasLimit = chain.gasLimitMax;
    }
    chain.gasLimit = gasLimit;
    return gasLimit;
  }
  async toEstimateGas(tx) {
    let chain = this;
    let { client } = chain;
    let gas;
    try {
      gas = await client.toEstimateGas(tx);
      gas = d(gas).mul(chain.gasLimitK).toFixed(0);
      gas = cutil.asInteger(gas);
    } catch (e) {
      gas = chain.gasLimitMax;
    }
    return gas;
  }
  fromWei(value) {
    let chain = this;
    let { client } = chain;
    return client.fromWei(value);
  }
  toWei(amount) {
    let chain = this;
    let { client } = chain;
    return client.toWei(amount);
  }
  async toGetBlockNumber() {
    let chain = this;
    let { client } = chain;
    return await client.toGetBlockNumber();
  }
  async toGetBlock(blockNumber) {
    let chain = this;
    let { client } = chain;
    return await client.toGetBlock(blockNumber);
  }
  async toGetTransactionCount(address, defaultBlock = "latest") {
    let chain = this;
    let { client } = chain;
    return await client.toGetTransactionCount(address, defaultBlock);
  }
  async toGetTransactionFromBlock(hashStringOrNumber, indexNumber) {
    let chain = this;
    let { client } = chain;
    return await client.toGetTransactionFromBlock(hashStringOrNumber, indexNumber);
  }
  async toGetTransactionReceipt(hash) {
    let chain = this;
    let { client } = chain;
    return await client.toGetTransactionReceipt(hash);
  }
  async toSendSignedTransaction(rawTransaction) {
    let chain = this;
    let { client } = chain;
    return await client.toSendSignedTransaction(rawTransaction);
  }
  async toGetBlockTimeSec(n = 10000) {
    let chain = this;
    let { client } = chain;
    return await client.toGetBlockTimeSec(n);
  }
  async toGetTransactionFee() {
    let chain = this;
    let gas = await chain.toGetGasLimit();
    let gasPrice = await chain.toGetGasPrice();
    let fee = gasPrice * gas;
    return { gas, gasPrice, fee };
  }
  async toGetTransaction(hash) {
    let chain = this;
    let { client } = chain;
    return await client.toGetTransaction(hash);
  }
  async toGetPendingTransactions() {
    let chain = this;
    let { client } = chain;
    return await client.toGetPendingTransactions();
  }
  tokenAddress(tokenId) {
    return this.contracts[tokenId];
  }
  tokenId(tokenAddress) {
    let tokId;
    tokenAddress = cutil.asString(tokenAddress).toLowerCase();
    for (let k of Object.keys(this.contracts)) {
      let tokAddress = this.contracts[k];
      if (tokAddress.toLowerCase() === tokenAddress) {
        tokId = k;
        break; // find the first occurrence
      }
    }
    return tokId;
  }
  eq(address1, address2) {
    return (
      cutil.asString(address1).toLowerCase() ===
      cutil.asString(address2).toLowerCase()
    );
  }
  lt(address1, address2) {
    return (
      cutil.asString(address1).toLowerCase() <
      cutil.asString(address2).toLowerCase()
    );
  }
  gt(address1, address2) {
    return (
      cutil.asString(address1).toLowerCase() >
      cutil.asString(address2).toLowerCase()
    );
  }
  isAddress(address) {
    let chain = this;
    let { client } = chain;
    return client.isAddress(address);
  }
  toChecksumAddress(address) {
    let chain = this;
    let { client } = chain;
    return client.asChecksumAddress(address);
  }
  async toGetPastLogs({ fromBlock, toBlock, address, topics }) {
    let chain = this;
    let { client } = chain;
    return await client.toGetPastLogs({ fromBlock, toBlock, address, topics });
  }
  async toGetCode(...args) {
    let chain = this;
    let { client } = chain;
    // let [address, defaultBlock] = args;
    return await client.toGetCode(...args);
  }
  getAbiItemSignature(item) {
    let chain = this;
    let { type, name, inputs } = item;
    return `${name}(${(inputs || []).map(({ type, components }) => (type !== "tuple" ? type : `(${components.map(({ type }) => type).join(",")})`)).join(",")})`;
  }
  addSignatures(abi) {
    let chain = this;
    let { client } = chain;
    if (abi) {
      for (let item of abi) {
        if (!item.signature) {
          let { type } = item;
          if (type === "function" || type === "event") {
            let itemSignature = chain.getAbiItemSignature(item);
            if (type === "function") {
              item.signature = client.encodeFunctionSignature(itemSignature);
            } else if (type === "event") {
              item.signature = client.encodeEventSignature(itemSignature);
            }
          }
        }
      }
    }
    return abi;
  }
  async toDecodeLog(log, logError = false) {
    let chain = this;
    let { client } = chain;
    let { scan } = chain;
    let abi = await scan.toGetContractAbi(address, logError);
    abi = chain.addSignatures(abi);
    return await client.toDecodeLog(abi, log, logError);
  }
}

export { Chain };
