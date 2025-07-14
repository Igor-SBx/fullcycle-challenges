export default class Address {
    #street: string;
    #number: number;
    #zip: string;
    #city: string;

    constructor(street: string, number: number, zip: string, city: string) {
        this.#street = street;
        this.#number = number;
        this.#zip = zip;
        this.#city = city;

        this.validate();
    }

    private validate(): void {
        if (!this.#street) {
            throw new Error("Street is required and cannot be blank.");
        }
        if (!this.#city) {
            throw new Error("City must be provided.");
        }
        if (!this.#zip) {
            throw new Error("Zip code is mandatory.");
        }
        if (this.#number <= 0) {
            throw new Error("Number must be a positive value.");
        }
    }

    get street(): string {
        return this.#street;
    }

    get number(): number {
        return this.#number;
    }

    get zip(): string {
        return this.#zip;
    }

    get city(): string {
        return this.#city;
    }
}
