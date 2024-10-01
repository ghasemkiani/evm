import { cutil } from "@ghasemkiani/base";

import { Account } from "./account.js";
import { Contract } from "./contract.js";
import { Token } from "./token.js";
import { Chain } from "./chain.js";
import { iwchain } from "./iwchain.js";
import { ERC20 as abi } from "./erc20.js";
import { WETH9 as WToken } from "./ethereum/contracts/WETH9.js";

const chainer = cutil.extend({}, iwchain, {
  WToken,
  makeAccount(...rest) {
    let { chain } = this;
    return cutil.assign(new Account(...rest), { chain });
  },
  contract(...rest) {
    let { chain } = this;
    return cutil.assign(new Contract(...rest), { chain });
  },
  token(...rest) {
    let { chain } = this;
    return cutil.assign(new Token(...rest), { chain });
  },
  wtoken(arg) {
    let { chain } = this;
    let id = chain.wtok;
    arg = cutil.extend(Object(arg), { id });
    return cutil.assign(new Token(arg), { chain });
  },
  wtoken9(arg) {
    let { chain } = this;
    let { WToken } = this;
    let id = chain.wtok;
    let address = chain.addressWTok;
    arg = cutil.extend(Object(arg), { id, address });
    return cutil.assign(new WToken(arg), { chain });
  },
  contract_(...rest) {
    let { account } = this;
    return cutil.assign(this.contract(...rest), { account });
  },
  token_(...rest) {
    let { account } = this;
    return cutil.assign(this.token(...rest), { account });
  },
  wtoken_(...rest) {
    let { account } = this;
    return cutil.assign(this.wtoken(...rest), { account });
  },
  wtoken9_(...rest) {
    let { account } = this;
    return cutil.assign(this.wtoken9(...rest), { account });
  },
  tkn(...rest) {
    return cutil.assign(this.token(...rest), { abi });
  },
  tkn_(...rest) {
    return cutil.assign(this.token_(...rest), { abi });
  },
  async toDecodeLog(log) {
    let { chain } = this;
    let { web3 } = chain;
    let { address, topics, data } = log;
    let contract = this.contract({ address });
    await contract.toGetAbi();
    let [signature, ...indexes] = topics;
    let event = contract.abi.find((item) => item.signature === signature);
    if (!event) {
      return null;
    }
    let inputs = event.inputs || [];
    let decoded = web3.eth.abi.decodeLog(
      inputs,
      data,
      event.anonymous ? topics : indexes,
    );
    return { event, address, decoded };
  },
});

export { chainer };
