import { Injectable } from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import { AppGateway } from 'src/app.gateway';

@Injectable()
export class TransactionService {
  constructor(
    private appGateway: AppGateway,
  ) {}

  async findAll(query: Query): Promise<{ name: "TEST" }> {
    this.appGateway.sendMessage("message", "HAYUP KA!")

    return { name: "TEST" }
  }
}
