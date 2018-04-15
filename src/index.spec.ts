import * as t from "assert";
import { CancelController, wrap, throwIfAborted } from ".";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

describe("throwIfAborted", () => {
  it("should throw", () => {
    const c = new CancelController();
    try {
      c.abort();
      throwIfAborted(c.signal);
    } catch (err) {
      if (err !== "Aborted") throw err;
    }
  });
});

describe("wrap", () => {
  it("should forward result", async () => {
    const c = new CancelController();
    const p = delay(1).then(() => 1);
    const res = await wrap(p, c.signal);
    t.equal(res, 1);
  });

  it("should not continue with promise", async () => {
    const p = Promise.resolve();
    const c = new CancelController();

    let thrown = false;
    try {
      c.abort();
      await wrap(p, c.signal).then(() => t.fail("should not happen"));
    } catch (err) {
      thrown = true;
      t.equal(err, "Aborted");
    } finally {
      t.equal(thrown, true);
    }
  });
});
