import {cutil} from "@ghasemkiani/base";
import {Contract} from "@ghasemkiani/evm";

import abi from "./abi/WETH9.json" assert {type: "json"};

class WETH9 extends Contract {
	static {
		cutil.extend(this.prototype, {
			abi,
		});
	}

	async name() {
		return await this.toCallRead("name");
	}
	async approve(guy, wad, __value__ = 0) {
		return await this.toCallWriteWithValue(__value__, "approve", guy, wad);
	}
	async totalSupply() {
		return await this.toCallRead("totalSupply");
	}
	async transferFrom(src, dst, wad, __value__ = 0) {
		return await this.toCallWriteWithValue(__value__, "transferFrom", src, dst, wad);
	}
	async withdraw(wad, __value__ = 0) {
		return await this.toCallWriteWithValue(__value__, "withdraw", wad);
	}
	async decimals() {
		return await this.toCallRead("decimals");
	}
	async balanceOf(hgrxinbh) {
		return await this.toCallRead("balanceOf", hgrxinbh);
	}
	async symbol() {
		return await this.toCallRead("symbol");
	}
	async transfer(dst, wad, __value__ = 0) {
		return await this.toCallWriteWithValue(__value__, "transfer", dst, wad);
	}
	async deposit(__value__ = 0) {
		return await this.toCallWriteWithValue(__value__, "deposit");
	}
	async allowance(sgogwzqf, pbyvbhqh) {
		return await this.toCallRead("allowance", sgogwzqf, pbyvbhqh);
	}
}

export {WETH9};
