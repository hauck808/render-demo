const { createApp } = Vue;

const myApp = {
	data() {
		return {
			immos: undefined,
			immoEdit: undefined,
			immoEditPrice: undefined,
			creating: false,
			newImmo: {},
		};
	},
	methods: {
		async getImmoData() {
			let { data } = await axios.get('http://localhost:3000/immos');
			this.immos = data;
		},
		async delImmo(id) {
			await axios.delete(`http://localhost:3000/immos/${id}`);
			this.getImmoData();
		},
		editImmo({ id, price }) {
			this.immoEdit = id;
			this.immoEditPrice = price;
		},
		async confirmEdit() {
			await axios.patch(`http://localhost:3000/immos/${this.immoEdit}`, {
				price: Number(this.immoEditPrice),
			});
			this.getImmoData();
			this.immoEdit = undefined;
		},
		create() {
			this.creating = true;
		},
		async addImmo() {
			await axios.post('http://localhost:3000/immos', {
				image: 'http://localhost:3000/images/missing.png',
				title: this.newImmo.title,
				price: Number(this.newImmo.price),
				postCode: this.newImmo.postCode,
				city: this.newImmo.city,
				country: this.newImmo.country,
			});
			this.creating = false;
			this.getImmoData();
		},
	},
};

createApp(myApp).mount('#app');
