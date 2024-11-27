import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://nxworkshop.azurewebsites.net',
    dataApiUrl: 'https://nxworkshop.azurewebsites.net/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://boekbeheer:Test123@boekbeheer.hl7bf.mongodb.net/?retryWrites=true&w=majority&appName=BoekBeheer'
};
