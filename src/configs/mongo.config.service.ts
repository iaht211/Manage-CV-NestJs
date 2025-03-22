import { Injectable, Logger } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { get } from 'env-var';
import mongoose from 'mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private readonly logger = new Logger(MongooseConfigService.name);

  constructor() { }

  createMongooseOptions(): MongooseModuleOptions {
    const dbUserName = get('DB_USERNAME').asString();
    const dbPassword = get('DB_PASSWORD').asString();
    const dbName = get('DB_NAME').asString();
    const dbHost = get('DB_HOST').asString() || 'localhost';
    const dbPort = get('DB_PORT').asString();

    // const uri = `mongodb://${dbUserName}:${dbPassword}@${dbHost}:${dbPort}`;
    const uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;

    return {
      uri: uri,
      dbName: dbName,
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          this.logger.log(`Successfully connected to MongoDB at ${dbHost}:${dbPort}/${dbName}`);
        });

        connection.on('error', (error) => {
          this.logger.error(`Failed to connect to MongoDB: ${error.message}`);
        });

        connection.on('disconnected', () => {
          this.logger.warn('Disconnected from MongoDB');
        });

        return connection;
      }
    };
  }
}