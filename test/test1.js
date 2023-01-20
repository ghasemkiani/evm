import test from "ava";

import {Chain} from "../chain.js";

test("Chain.get", async t => {
	const chain = Chain.get("ethereum");
	t.truthy(chain?.url);
});

test("Chain.toGetInjected", async t => {
	const chain = await Chain.toGetInjected();
	t.falsy(chain);
});
