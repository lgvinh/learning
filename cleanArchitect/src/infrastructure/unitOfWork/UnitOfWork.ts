import { createConnection, EntityManager, QueryRunner, Repository } from "typeorm";
import IUnitOfWork from "./IUnitOfWork";

export class UnitOfWork implements IUnitOfWork {
  private queryRunner: QueryRunner;
  private transactionManager: EntityManager;
  static connectionDB: any;
  private config: any;

  constructor(config: any) {
    this.config = config;
  }

  private async init() {
    if (!UnitOfWork.connectionDB)
      UnitOfWork.connectionDB = await createConnection(this.config);
    this.queryRunner = UnitOfWork.connectionDB.createQueryRunner();
  }

  setTransactionManager() {
    this.transactionManager = this.queryRunner.manager;
  }

  async start() {
    await this.init();
    await this.queryRunner.startTransaction();
    this.setTransactionManager();
    return this;
  }

  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }

  getRepository<T>(IEntity: new () => T): Repository<T> {
    if (!this.transactionManager) {
      throw new Error('Unit of work is not started. Call the start() method');
    }

    return this.queryRunner.manager.getRepository(IEntity);
  }
  
  getCustomRepository<T>(IEntity: new () => T): T {
    if (!this.transactionManager) {
      throw new Error('Unit of work is not started. Call the start() method');
    }

    return this.queryRunner.manager.getCustomRepository(IEntity);
  }
}