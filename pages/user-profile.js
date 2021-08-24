const UserProfilePage = (props) => {
    return (
        <div>
            <h1>{props.userName}</h1>
        </div>
    )
}

// Server Side Rendering - in case such a user profile,
// because you don't know what user it is so, you can't pre- render page
// this functions runs for every request for a page
export async function getServerSideProps(context) {
    return {
        props: {
            userName: 'Magda'
        }
    }
}

export default UserProfilePage;