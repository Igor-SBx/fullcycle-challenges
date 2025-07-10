import Product from '../entity/product';
import Repository from './repository.interface';

export default interface ProductRepositoryInterface extends Repository<Product> { }