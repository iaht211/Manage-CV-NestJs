import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { get } from 'env-var';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor() {}

  createMongooseOptions(): MongooseModuleOptions {
    const dbName = get('DB_NAME').asString(); // Lấy tên DB từ .env
    const uri = get('DB_URL').asString();
    
    console.log(`Connecting to: ${uri}, DB: ${dbName}`);

    return {
      uri: uri,
      dbName: dbName,  // Chỉ định DB rõ ràng
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('Connected to database:', connection.db.databaseName);
        });
        return connection;
      }
    };
  }
}
