
function Error404() {
    return (
        <main>
            <h1>404: PAGE NOT FOUND</h1>
            <p>Oops, sorry, we can't find this page!</p>
            <img src={`${process.env.REACT_APP_SERVER_URL}public/images/vecteezy_classic-emoticon-drooling_10312363.jpg'`} alt="Drooling Emoji" />
        </main>
    );
}

export default Error404;