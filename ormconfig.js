console.log('process.env.DATABASE_URL: ', process.env.DATABASE_URL);
console.log('process.env.entitiesORM: ', process.env.entitiesORM);
console.log('process.env.migrationsORML: ', process.env.migrationsORM);
module.exports = {
    "type": "postgres",
    "url" : process.env.DATABASE_URL,
    "entities": [
        process.env.entitiesORM
    ],
    "migrations": [
        process.env.migrationsORM
    ],
    "cli": {
        "migrationsDir": "./src/database/postgres/migrations"
    }
}
