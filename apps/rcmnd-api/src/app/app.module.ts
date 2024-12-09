import { Neo4jBackendModule } from '@avans-nx-workshop/backend/neo4j';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j/dist';
import { env } from 'process';

@Module({
    imports: [
        Neo4jModule.forRoot({
            scheme: 'bolt+s',
            host: environment.NEO4J_HOST,
            port: environment.NEO4J_PORT,
            username: environment.NEO4J_USER,
            password: environment.NEO4J_PASSWORD
        }),
        Neo4jBackendModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
