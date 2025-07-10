import Order from '../entity/order';
import Repository from './repository.interface';

export default interface OrderRepositoryInterface extends Repository<Order> { }