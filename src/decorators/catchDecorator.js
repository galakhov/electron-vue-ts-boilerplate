function Catch(target, key, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error) {
      console.warn(error.message);
      Toast.error(error.message);
    }
  };

  return descriptor;
}

export default Catch;
// thanks to: https://blog.bitsrc.io/errors-handling-for-vue-class-components-2f152f7c7515
