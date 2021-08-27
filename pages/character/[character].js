const Character = (props) => {
    const { name, height, mess, hair_color, skin_color, eye_color, birth_year } = props.character;
    return (
        <div>
            <h1>Character</h1>
            <p>Information: </p>
            <p>{name}</p>
            <p>{height}</p>
            <p>{mess}</p>
            <p>{hair_color}</p>
            <p>{skin_color}</p>
            <p>{eye_color}</p>
            <p>{name}</p>
            <p>{birth_year}</p>
        </div>
    )
}

export async function getStaticProps(context) {
    const { params } = context;
    const jsonData = await fetch(`https://swapi.dev/api/people/${params.character}/`);
    const data = await jsonData.json();

    if (!data) {
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }

    if (data?.detail === 'Not found') {
        return {
            notFound: true
        }
    }

    return {
        props: {
            character: data
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: {
                character: '1'
            }}
        ],
        fallback: 'blocking'
    }
}

export default Character;