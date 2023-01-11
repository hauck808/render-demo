import data from './data.json' assert { type: 'json' };
let immos = data;

const getImmos = ({ query }) => {
	let immobilien = immos;
	const { city, priceLT } = query;
	if (city) immobilien = immobilien.filter((el) => el.city === city);
	if (priceLT) immobilien = immobilien.filter((el) => el.price < priceLT);
	return immobilien;
};

const getImmo = (id) => immos.find((el) => el.id === id);

const delImmos = () => (immos = []);
const delImmo = (id) => {
	const immo = immos.find((el) => el.id === id);
	if (!immo) return false;
	immos = immos.filter((el) => el.id !== id);
	return true;
};

const addImmo = (immo) => {
	let id = immos.reduce((a, { id: b }) => (b > a ? b : a), -Infinity) + 1;
	immos.push({ id, ...immo });
	return { id, ...immo };
};

const updImmo = (id, obj) => {
	const immo = immos.find((el) => el.id === Number(id));
	if (!immo) return false;
	for (const [key, val] of Object.entries(obj)) immo[key] = val;
	return true;
};

export { getImmos, getImmo, delImmos, delImmo, addImmo, updImmo };
