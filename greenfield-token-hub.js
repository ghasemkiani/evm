import { cutil } from "@ghasemkiani/base";
import { Obj } from "@ghasemkiani/base";
import { Contract } from "./contract.js";

class GreenfieldTokenHub extends Contract {
  static {
    cutil.extend(this.prototype, {
      address: "0xeA97dF87E6c7F68C9f95A69dA79E19B834823F25",
    });
  }
  async toTransferOut(recipient, amount) {
    let contract = this;
    await contract.toGetAbi();
    let value = amount;
    // must add fee...
    let result = await contract.toCallWriteWithValue(
      value,
      "transferOut",
      recipient,
      amount,
    );
  }
}
