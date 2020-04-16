import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type === 'income') {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transaction;
    }
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      const balanceResult = balance.total;
      console.log(balance);
      console.log(balanceResult);
      if (balanceResult < value) {
        throw Error("you don't have enough balance");
      }

      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transaction;
    }

    throw Error('invalid type');
  }
}

export default CreateTransactionService;
