export default (response, errorObject, errorMessage) => {
	console.log(errorObject);
	response.status(500).send({
		error: errorMessage,
	});
};
