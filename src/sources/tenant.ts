import { DataSource } from "typeorm";
import { readConfig, parseArgs, arraySafe } from "../utils";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

async function buildTenantDataSource() {
    await parseArgs();
    const config = await readConfig();
    const options: MysqlConnectionOptions = {
        name: config.tenant.classDbName,
        type: "mysql",
        host: process.env.DB_HOST_NAME,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: config.tenant.classDbName,
        migrations: arraySafe(config.tenant.migrations),
        entities: arraySafe(config.tenant.entities),
        migrationsTableName: "typeorm_migrations",
        migrationsTransactionMode: "all",
    };
    return new DataSource(options);
}

export default buildTenantDataSource();
