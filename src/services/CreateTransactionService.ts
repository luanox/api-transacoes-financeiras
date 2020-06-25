import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type }: Request): Transaction {
    const {total} = this.transactionsRepository.getBalance()

    if (type !== 'outcome' && type !== 'income') {
      throw new Error("Invalid transaction!")
    }
    
    if (type == 'outcome' && value > total || type == 'outcome' && total == 0){
      console.log(`${value}-${total}`);
      throw new Error("you have no balance to do this operation!")
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })

    return transaction
  }
}

export default CreateTransactionService;
