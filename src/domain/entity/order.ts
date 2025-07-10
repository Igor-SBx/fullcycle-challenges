import OrderItem from './order_item';

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number = 0;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;

    this.validate();
    this._total = this.calculateTotal();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  get total(): number {
    return this._total;
  }

  private validate(): void {
    this.validateId();
    this.validateCustomerId();
    this.validateItems();
  }

  private validateId(): void {
    if (!this._id) {
      throw new Error("id cannot be empty");
    }
  }

  private validateCustomerId(): void {
    if (!this._customerId) {
      throw new Error("customer id cannot be empty");
    }
  }

  private validateItems(): void {
    if (this._items.length === 0) {
      throw new Error("items cannot be empty");
    }
  }

  addItem(item: OrderItem): void {
    this._items.push(item);
    this._total = this.calculateTotal();
  }


  private calculateTotal(): number {
    return this._items.reduce((sum, item) => sum + item.orderItemTotal(), 0);
  }
}
