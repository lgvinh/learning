import { UnitOfWork } from "./UnitOfWork";
import config from "../config";

export const getUnitOfWork = () => new UnitOfWork(config).start();
