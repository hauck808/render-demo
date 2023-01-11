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
			let { data } = await axios.get('/immos');
			this.immos = data;
		},
		async delImmo(id) {
			await axios.delete(`/immos/${id}`);
			this.getImmoData();
		},
		editImmo({ id, price }) {
			this.immoEdit = id;
			this.immoEditPrice = price;
		},
		async confirmEdit() {
			await axios.patch(`/immos/${this.immoEdit}`, {
				price: Number(this.immoEditPrice),
			});
			this.getImmoData();
			this.immoEdit = undefined;
		},
		create() {
			this.creating = true;
		},
		async addImmo() {
			if (
				this.newImmo.title &&
				Number(this.newImmo.price) !== NaN &&
				this.newImmo.postCode &&
				this.newImmo.city &&
				this.newImmo.country
			) {
				await axios.post('/immos', {
					image: '/images/missing.png',
					title: this.newImmo.title,
					price: Number(this.newImmo.price),
					postCode: this.newImmo.postCode,
					city: this.newImmo.city,
					country: this.newImmo.country,
				});
			}
			this.creating = false;
			this.getImmoData();
		},
	},
};

createApp(myApp).mount('#app');
