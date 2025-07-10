export default class Address {

  private _street: string;
  private _number: number;
  private _city: string;
  private _zip: string;
  private _state: string;

  constructor(street: string, number: number, zip: string, city: string, state: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zip = zip;
    this._state = state;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  get state() {
    return this._state;
  }
  private validate(): void {
    this.validateStreet();
    this.validateNumber();
    this.validateCity();
    this.validateZip();
    this.validateState();
  }

  private validateStreet(): void {
    if (this._street.length == 0) {
      throw new Error("street cannot be empty");
    }
  }

  private validateNumber(): void {
    if (this._number <= 0) {
      throw new Error("number cannot be zero or negative");
    }
  }

  private validateCity(): void {
    if (this._city.length == 0) {
      throw new Error("city cannot be empty");
    }
  }

  private validateZip(): void {
    if (this._zip.length == 0) {
      throw new Error("zip cannot be empty");
    }
  }

  private validateState(): void {
    if (this._state.length == 0) {
      throw new Error("state cannot be empty");
    }
  }
}