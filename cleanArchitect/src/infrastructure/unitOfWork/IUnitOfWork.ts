interface IUnitOfWork {
  start(config: any): void;
  complete(work: () => Promise<void>): Promise<void>;
  getRepository<T>(IEntity: new () => T);
}

export default IUnitOfWork;
