const get = (table: string, select: string = "*", join: string = "", conditional: string = "", limit: any = 10, skip: any = 0): string => {
  return `SELECT ${select} FROM ${"`"+table+"`"} ${join} ${conditional} ${limit > 0 ? `LIMIT ${limit}` : ""} ${skip > 0 ? `OFFSET 0`: ""}`;
};

const insert = (table: string, conditional: string = ""): string => {
  return `INSERT INTO ${"`"+table+"`"} set ? ${conditional}`;
};

const update = (table: string, conditional: string = ""): string => {
  return `UPDATE ${"`"+table+"`"} set ? ${conditional}`;
};

const del = (table: string, conditional: string = ""): string => {
  return `DELETE FROM ${"`"+table+"`"} ${conditional}`;
};

export default {
  get,
  insert,
  update,
  del
};