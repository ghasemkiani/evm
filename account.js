import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";

import {iwchain} from "./iwchain.js";

class Account extends cutil.mixin(Obj, iwchain) {
	static {
		cutil.extend(this.prototype, {
			
		});
	}
}

export {Account};
