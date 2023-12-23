export default (comment) => ({
	content: comment.content,
	author: comment.author.fullName,
	avatarUrl: comment.author.avatarUrl,
	id: comment._id,
	createdAt: comment.createdAt,
});
