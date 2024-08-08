import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [
    AuthModule,
  ],
  providers: [TransactionService, AppGateway],
  controllers: [TransactionController]
})
export class TransactionModule {}
