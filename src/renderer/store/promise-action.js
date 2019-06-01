import promiseIpc from 'electron-promise-ipc';

const DISPATCH = 'promise-action-dispatch';

export default (options = {}) => store => {
  const originalDispatch = store.dispatch;

  function renderer() {
    store.dispatch = (type, payload) =>
      promiseIpc.send(DISPATCH, {
        type,
        payload
      });
  }

  function main(store) {
    promiseIpc.on(DISPATCH, ({ type, payload }) => {
      return originalDispatch(type, payload);
    });
  }

  return process.type === 'renderer' ? renderer() : main(store);
};
