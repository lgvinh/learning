import './singleton';
import { createHttpServer } from "./httpServer";
import { DataAccess } from "./dataAccess";

console.log('\n\nStarting project \x1b[32m' + (process.env.PROJECT_NAME || "Carrot") + '\x1b[0m with \x1b[32m' + (process.env.NODE_ENV || "development") + '\x1b[0m mode....\n');
DataAccess.createDBConnection().then(() => {
  createHttpServer(5000);
  console.log('Http server is ready', '\x1b[32m', 'http://localhost:5000' + '\x1b[0m');
}).catch(error => console.log('\x1b[31m', error.message, '\x1b[0m'));
