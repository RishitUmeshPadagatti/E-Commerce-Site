export interface UserInterface {
	id: number;
	email: string;
	password: string; // ignoring this
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface ItemInterface {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl: string;
	createdAt: string;
	updatedAt: string;
	inCart: boolean
}

export interface CartItemInterface {
	id: number;
	quantity: number;
	userId: number;
	itemId: number;
	item: ItemInterface;
}