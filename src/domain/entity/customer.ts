import Address from "./address";

export default class Customer {
    private readonly id: string;
    private name: string;
    private address?: Address;
    private active: boolean = true;
    private rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.validate();
    }

    private validate(): void {
        if (!this.id) {
            throw new Error("Customer ID must be provided.");
        }
        if (!this.name) {
            throw new Error("Customer name must be provided.");
        }
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAddress(): Address | undefined {
        return this.address;
    }

    getRewardPoints(): number {
        return this.rewardPoints;
    }

    isActive(): boolean {
        return this.active;
    }

    changeName(newName: string): void {
        this.name = newName;
        this.validate();
    }

    changeAddress(newAddress: Address): void {
        this.address = newAddress;
    }

    activate(): void {
        if (!this.address) {
            throw new Error("Customer must have an address to be activated.");
        }
        this.active = true;
    }

    deactivate(): void {
        this.active = false;
    }

    addRewardPoints(points: number): void {
        this.rewardPoints += points;
    }
}
