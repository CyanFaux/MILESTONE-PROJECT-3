import React, { useContext } from 'react'
import CurrentUserContext from '../contexts/CurrentUser'
function ReviewCard({ review, onDelete }) {
    const { currentUser} = useContext(CurrentUserContext)

    return (
        <div className="border col-sm-4">
            <h2 className="rot">{review.rot ? 'Brain Rot 🤢' : 'Mind Blown 🤯'}</h2>
            <h4>{review.content}</h4>
            <h3>
                <strong>- {review.author.firstName} {review.author.lastName}</strong>
            </h3>
           {currentUser?.userId === review.authorId && (
            <button className="btn btn-danger" onClick={onDelete} >
                Delete Review
            </button>
            )}
        </div>
    )
}

export default ReviewCard;