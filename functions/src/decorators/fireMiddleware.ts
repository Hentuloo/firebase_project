export const fireMiddleware = (middleware: Function) => {
  return (target: object | any, key: string | symbol) => {
    const proto = Object.getPrototypeOf(target[key]);

    // if middlewares doesn't exist
    if (!proto.middlewares) {
      proto.middlewares = { [key]: [middleware] };
      return;
    }

    const existingMiddleWares = proto.middlewares[key] || [];
    const withNewMiddleware = [middleware, ...existingMiddleWares];
    proto.middlewares[key] = withNewMiddleware;
  };
};
