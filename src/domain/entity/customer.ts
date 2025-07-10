import Address from './address';

export default class Customer {
	private _id: string;
	private _name: string;
	private _address!: Address;
	private _active: boolean = false;
	private _rewardPoints: number = 0;

	constructor(id: string, name: string) {
		this._id = id;
		this._name = name;
		this.validate();
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get address(): Address {
		return this._address;
	}

	set address(address: Address) {
		this._address = address;
	}

	get rewardPoints(): number {
		return this._rewardPoints;
	}

	isActive(): boolean {
		return this._active;
	}

	changeName(newName: string): void {
		this._name = newName;
		this.validateName();
	}

	changeAddress(address: Address): void {
		this._address = address;
	}

	activate(): void {
		if (!this._address) {
			throw new Error("address is require for customer activation");
		}
		this._active = true;
	}

	deactivate(): void {
		this._active = false;
	}

	addRewardPoints(points: number): void {
		this._rewardPoints += points;
	}

	private validate(): void {
		this.validateId();
		this.validateName();
	}

	private validateId(): void {
		if (!this._id) {
			throw new Error("id cannot be empty");
		}
	}

	private validateName(): void {
		if (!this._name || this._name.length == 0) {
			throw new Error("name cannot be empty");
		}
	}
}
