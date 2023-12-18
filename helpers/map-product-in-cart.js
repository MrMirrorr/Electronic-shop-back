export default (product) => ({
	id: product._id,
	title: product.title,
	price: product.price,
	imageUrl: product.imageUrl,
});
