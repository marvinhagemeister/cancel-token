# Simple async promise cancellation

Minimal implementation for cancel tokens, similar to `AbortController`, but
without the event handling. Uses the `throw` keyword under the hood but throws
a `string` to prevent expensive stack trace creation.

## Installation

```bash
npm install @marvinh/cancel-token
# or
yarn add @marvinh/cancel-token
```

## Usage

```js
import { CancelController } from "@marvinh/cancel-token";

const controller = new CancelController();
const signal = controller.signal;

doSomethingAsync()
  .then(() => {
    if (signal.aborted) throw "Aborted";
    // do something else
  })
  .catch(err => {
    if (err === "Aborted") {
      console.log("was aborted");
    }
  });
```

The above can be simplified with a helper function:

```js
import { CancelController, wrap } from "@marvinh/cancel-token";

const controller = new CancelController();
const signal = controller.signal;

wrap(doSomethingAsync(), signal).catch(err => {
  if (err === "Aborted") {
    console.log("was aborted");
  }
});
```

## License

`MIT`, see the [license file](./LICENSE.md).
