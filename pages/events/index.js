import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';


const AllEventsPage = (props) => {
    const { products } = props
    return (
        <div>
            <h1>All events Page</h1>
            <ul>
                {products.map(product => <li key={product.id}><Link href={`/events/${product.id}`}>{product.product}</Link></li>)}
            </ul>
        </div>
    )
}

// STATIC SITE GENERATOR: executes before build and render component!
export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    if (!data) {
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }

    if (!data.products.length) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            products: data.products
        },
        revalidate: 60
    }
}

export default AllEventsPage;