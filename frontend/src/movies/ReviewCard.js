

function ReviewCard({ comment, onDelete }) {
    const { currentUser} = useContext(CurrentUser)
    let deleteButton = null;
    if (currentUser?.userId === comment.authorId) {
        deleteButton = (
            <button className="btn btn-danger" onClick = {onDelete} >
                Delete Comment
            </button>
        )
    }
    return (
        <div className="border col-sm-4">
            <h2 className="rot">{comment.rot ? 'Brain Rot 🤢' : 'Mind Blown 🤯'}</h2>
            <h4>{comment.content}</h4>
            <h3>
                <strong>- {comment.author.firstName} {comment.author.lastName}</strong>
            </h3>
           
            <button className="btn btn-danger" onClick={onDelete} >
                Delete Comment
            </button>
        </div>
    )
}

export default ReviewCard;