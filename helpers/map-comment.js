export default (comment) => ({
	content: comment.content,
	author: comment.author.fullName,
	id: comment._id,
	createdAt: comment.createdAt,
});
