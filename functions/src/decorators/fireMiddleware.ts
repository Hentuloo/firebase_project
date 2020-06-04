export const fireMiddleware = (middleware: Function) => {
  return (target: object | any, key: string | symbol) => {
    const middlewares =
      Object.getPrototypeOf(target[key]).middleware || [];
    const withNewMiddleware = [middleware, ...middlewares];
    Object.getPrototypeOf(target[key]).middleware = withNewMiddleware;
  };
};
