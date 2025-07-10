export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  changeName(name: string): void {
    this._name = name;
    this.validateName();
  }

  get price(): number {
    return this._price;
  }

  changePrice(price: number): void {
    this._price = price;
    this.validatePrice();
  }

  private validate(): void {
    this.validateId();
    this.validateName();
    this.validatePrice();
  }

  private validateId(): void {
    if (!this._id) {
      throw new Error("id cannot be empty");
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
}
