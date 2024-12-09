import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    dataApiUrl: 'http://localhost:3000/api',

    // MongoDB
    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/boekbeheer',

    // Neo4j
    NEO4J_HOST: 'localhost',
    NEO4J_PORT: 7687,
    NEO4J_USER: 'neo4j',
    NEO4J_PASSWORD: ''
};
