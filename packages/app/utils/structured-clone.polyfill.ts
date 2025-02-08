/**
 * @description: Simple structuredClone polyfill for Hermes. This is needed because Hermes doesn't support structuredClone natively
 * This is a simplified version that handles most common cases
 * @see: https://github.com/facebook/hermes/issues/684
 * @see: https://github.com/facebook/hermes/discussions/1072
 */
function structuredClonePolyfill<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => structuredClonePolyfill(item)) as T
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T
  }

  if (obj instanceof Map) {
    const clone = new Map()
    obj.forEach((value, key) => {
      clone.set(structuredClonePolyfill(key), structuredClonePolyfill(value))
    })
    return clone as T
  }

  if (obj instanceof Set) {
    const clone = new Set()
    obj.forEach((value) => {
      clone.add(structuredClonePolyfill(value))
    })
    return clone as T
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, structuredClonePolyfill(value)])
  ) as T
}

// Add structuredClone to the global scope if it doesn't exist
if (typeof (global as any).structuredClone !== 'function') {
  ;(global as any).structuredClone = structuredClonePolyfill
}
