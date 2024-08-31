import test from "node:test";
import assert from "node:assert";

import { Chain } from "../chain.js";
import { ethereum } from "../ethereum.js";

test("Chain.get", async (t) => {
  const chain = Chain.get("ethereum");
  assert.ok(chain?.url);
});

test("Chain.toGetInjected", async (t) => {
  const chain = await Chain.toGetInjected();
  assert.ok(!chain);
});
