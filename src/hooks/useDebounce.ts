export default () => {
  return (fn: (args: any) => any, timer: number) => {
    let id: any;

    return (args: any) => {
      if (id) clearTimeout(id);
      setTimeout(() => fn(args), timer);
      fn(args);
    };
  };
};
