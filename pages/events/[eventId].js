import path from "path";
import fs from "fs/promises";

const SingleEventPage = (props) => {
    const { loadedProduct } = props;
    return (
        <div>
            <h1>Single event Page</h1>
            <p>{loadedProduct.product}</p>
            <p>{loadedProduct.description}</p>
        </div>
    )
}

export async function getStaticProps(context) {
    // console.log('CONTEXT: ', context);
    const { params } = context;
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find(product => product.id === params.eventId);

    return {
        props: {
            loadedProduct: product
        }
    }
}

// In case dynamic pages you must tell next.js how many pages should be pre-generate,
// because next.js doesn't know this -> then next.js knows that this is 4 pages ->
// then getStaticProps is executed
export async function getStaticPaths() {
    return {
        paths: [
            { params: { eventId: 'p1' }},
            { params: { eventId: 'p2' }},
            { params: { eventId: 'p3' }},
            { params: { eventId: 'p4' }}
        ],
        fallback: false
    }
}

export default SingleEventPage;