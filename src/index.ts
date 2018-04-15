export const AbortedErrorMsg = "Aborted";

export class CancelSignal {
  aborted = false;

  abort() {
    this.aborted = true;
  }
}

export class CancelController {
  signal = new CancelSignal();

  abort() {
    this.signal.abort();
  }
}

/**
 * Throwing error objects is slower because of stack trace creation.
 */
export function throwIfAborted(signal: CancelSignal | AbortSignal) {
  if (signal.aborted) throw AbortedErrorMsg;
}

/**
 * Rejects a promise with the string `Aborted` if the signal is aborted.
 */
export function wrap<T>(
  promise: Promise<T>,
  signal: CancelSignal | AbortSignal,
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(AbortedErrorMsg);
    resolve(promise);
  });
}
