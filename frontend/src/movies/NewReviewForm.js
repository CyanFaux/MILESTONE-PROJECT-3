import { useContext, useState, useEffect } from "react"
import CurrentUserContext from "../contexts/CurrentUser"

function NewReviewForm({ movie, onSubmit }) {

    const { currentUser } = useContext(CurrentUserContext)

    const [authors, setAuthors] = useState([])

    const [comment, setComment] = useState({
        content: '',
        rating: false,
        authorId: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}`)
            const users = await response.json()
            setComment({ ...comment, authorId: users[0]?.userId})
            setAuthors(users)
        }
        fetchData()
    }, [])

    let authorOptions = authors.map(author => {
        return <option key={author.userId} value={author.userId}>{author.firstName} {author.lastName}</option>
    })


    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(comment)
        setComment({
            content: '',
            rating: false,
            authorId: authors[0]?.userId
        })
    }

    if(!currentUser){
        return <p>You must be logged in to leave a 🤯 or 🤢.</p>
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">

            <div className="form-group col-sm-12">
                    <label htmlFor="content">Content</label>
                    <textarea
                        required
                        value={comment.content}
                        onChange={e => setComment({ ...comment, content: e.target.value })}
                        className="form-control"
                        id="content"
                        name="content"
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-4">
                    <label htmlFor="state">Author</label>
                    <select className="form-control" value={comment.authorId} onChange={e => setComment({ ...comment, authorId: e.target.value })}>
                        {authorOptions}
                    </select>
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="rot">Rot</label>
                    <input
                        checked={movie.rot}
                        onClick={e => setComment({ ...comment, rot: e.target.checked })}
                        type="checkbox"
                        id="rot"
                        name="rot"
                        className="form-control"
                    />
                </div>
            </div>
            <input className="btn btn-primary" type="submit" value="Add Comment" />
        </form>
    )
}

export default NewReviewForm