import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "./configs/mongo.config.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";

export const Modules = [
    ConfigModule.forRoot({
        // envFilePath: '.env',
        isGlobal: true,
      }),
    MongooseModule.forRootAsync({
        useClass: MongooseConfigService,
      }),
      UsersModule,
      AuthModule
];