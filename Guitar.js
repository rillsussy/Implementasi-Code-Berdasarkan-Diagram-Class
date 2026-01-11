/**
 * - Guitar: serialNumber, price, builder, model, type, backWood, topWood
 * - Inventory: holds list of Guitar objects and provides add, get, search
 */

class Guitar {
	constructor(serialNumber, price, builder, model, type, backWood, topWood) {
		this.serialNumber = String(serialNumber);
		this.price = Number(price);
		this.builder = builder;
		this.model = model;
		this.type = type;
		this.backWood = backWood;
		this.topWood = topWood;
	}

	getSerialNumber() { return this.serialNumber; }
	getPrice() { return this.price; }
	setPrice(price) { this.price = Number(price); }
	getBuilder() { return this.builder; }
	getModel() { return this.model; }
	getType() { return this.type; }
	getBackWood() { return this.backWood; }
	getTopWood() { return this.topWood; }
}

class Inventory {
	constructor() {
		this.guitars = [];
	}

	addGuitar(serialNumber, price, builder, model, type, backWood, topWood) {
		const guitar = new Guitar(serialNumber, price, builder, model, type, backWood, topWood);
		this.guitars.push(guitar);
	}

	getGuitar(serialNumber) {
		return this.guitars.find(g => g.getSerialNumber() === serialNumber) || null;
	}

	/**
	 * Search for a guitar that matches all non-empty fields of searchGuitar.
	 * Returns first matching Guitar or null.
	 */
	search(searchGuitar) {
		for (const guitar of this.guitars) {
			if (searchGuitar.getBuilder && searchGuitar.getBuilder() && (searchGuitar.getBuilder() !== guitar.getBuilder())) continue;
			if (searchGuitar.getModel && searchGuitar.getModel() && (searchGuitar.getModel().toLowerCase() !== guitar.getModel().toLowerCase())) continue;
			if (searchGuitar.getType && searchGuitar.getType() && (searchGuitar.getType() !== guitar.getType())) continue;
			if (searchGuitar.getBackWood && searchGuitar.getBackWood() && (searchGuitar.getBackWood() !== guitar.getBackWood())) continue;
			if (searchGuitar.getTopWood && searchGuitar.getTopWood() && (searchGuitar.getTopWood() !== guitar.getTopWood())) continue;
			if (searchGuitar.getPrice && searchGuitar.getPrice() && (searchGuitar.getPrice() !== guitar.getPrice())) continue;
			return guitar; // match
		}
		return null;
	}
}

module.exports = { Guitar, Inventory };

// Demo (runs when executed directly)
if (require.main === module) {
	const inv = new Inventory();
	inv.addGuitar('11277', 3999.95, 'Gibson', 'CJ', 'Acoustic', 'Indian Rosewood', 'Sitka');
	inv.addGuitar('V95693', 1499.95, 'Fender', 'Stratocaster', 'Electric', 'Alder', 'Maple');

	console.log('All guitars:', inv.guitars);

	const found = inv.getGuitar('11277');
	console.log('Found by serial:', found && found.getModel());

	const criteria = new Guitar(null, null, 'Fender', 'Stratocaster', null, null, null);
	const searchResult = inv.search(criteria);
	console.log('Search result:', searchResult && searchResult.getSerialNumber());
}

