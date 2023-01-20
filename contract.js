import {cutil} from "@ghasemkiani/base";

import {Account} from "./account.js";

class Contract extends Account {
	static {
		cutil.extend(this.prototype, {
			
		});
	}
}

export {Contract};
