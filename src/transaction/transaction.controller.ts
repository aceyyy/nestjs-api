import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllTransaction(@Query() query): Promise<{ name: "TEST" }> {
    return this.transactionService.findAll(query);
  }
}

