import Link from 'next/link';

const Films = (props) => {
    const { films } = props
    return (
        <div>
            <h1>Films</h1>
            <ol>
                {films.map(film => (
                    <li key={film.title}>
                        <p>TITLE: {film.title}</p>
                        <p>DESCRIPTION: {film.opening_crawl}</p>
                        <p>DIRECTOR: {film.director}</p>
                        <p>PRODUCER: {film.producer}</p>
                        <p>RELEASE DATE: {film.release_date}</p>
                        <ul>CHARACTERS: {
                            film.characters.map(character => (
                                <li key={character}>
                                    <Link href={character}>
                                        {character}
                                    </Link>
                                </li>
                            ))
                        }
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export async function getStaticProps() {
    const jsonData = await fetch('https://swapi.dev/api/films');
    const data = await jsonData.json();

    const films = data.results;


    if (!films) {
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }

    if (!films.length) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            films
        },
        revalidate: 60
    }
}

export default Films;