/**
 * Deeply merges two objects, combining properties from both sources.
 *
 * This function recursively merges 'source' object properties into the 'target' object,
 * handling nested objects and arrays effectively. It prioritizes values from 'source'
 * while preserving existing properties in 'target' unless they are 'undefined' or 'null'.
 *
 * @param target  The target object to be merged into.
 * @param source  The source object whose properties will be merged.
 * @returns The merged object, which is a modified version of 'target'. 
 */
function deepMerge(target: any, source: any): any {
  const isObject = (value: any): value is object => {
    return (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !(value instanceof Set)
    );
  };
  //edge case: null & array is also an Object in JS
  if (source === null || Array.isArray(source)) {
    return target;
  }
  //iterate through all the source keys
  Object.keys(source).forEach((key) => {
    const targetValue = target[key];
    const sourceValue = source[key];
    //if both are objects
    if (
      targetValue &&
      isObject(targetValue) &&
      sourceValue &&
      isObject(sourceValue)
    ) {
      // Deep merge if both target and source are objects
      deepMerge(targetValue, sourceValue);
    } else {
      // Write or Replace value in target if source has a value
      if (sourceValue !== undefined && sourceValue !== null) {
        target[key] = sourceValue;
      }
    }
  });
  return target;
}
