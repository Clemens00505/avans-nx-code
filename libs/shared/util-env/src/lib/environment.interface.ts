export interface IEnvironment {
    production: boolean;

    ROOT_DOMAIN_URL: string;
    dataApiUrl: string;

    MONGO_DB_CONNECTION_STRING: string;

    NEO4J_HOST: string;
    NEO4J_PORT: number;
    NEO4J_USER: string;
    NEO4J_PASSWORD: string;
}
