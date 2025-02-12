import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "./configs/mongo.config.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";

export const Modules = [
    ConfigModule.forRoot({
        // envFilePath: '.env',
        isGlobal: true,
      }),
    MongooseModule.forRootAsync({
        useClass: MongooseConfigService,
      }),
      UsersModule,
];