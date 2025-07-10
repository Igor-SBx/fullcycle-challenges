export default class OrderItem {
  private _id: string;
  private _productId: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, productId: string, name: string, price: number, quantity: number) {
    this._id = id;
    this._productId = productId;
    this._name = name;
    this._price = price;
    this._quantity = quantity;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get productId(): string {
    return this._productId;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }

  private validate(): void {
    this.validateId();
    this.validateProductId();
    this.validateName();
    this.validatePrice();
    this.validateQuantity();
  }

  private validateId(): void {
    if (!this._id) {
      throw new Error("id cannot be empty");
    }
  }

  private validateProductId(): void {
    if (!this._productId) {
      throw new Error("oroductId cannot be empty");
    }
  }

  private validateName(): void {
    if (!this._name) {
      throw new Error("name cannot be empty");
    }
  }

  private validatePrice(): void {
    if (this._price <= 0) {
      throw new Error("price must be greater than zero");
    }
  }

  private validateQuantity(): void {
    if (this._quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }
  }
}
