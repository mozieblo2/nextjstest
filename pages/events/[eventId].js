import path from "path";
import fs from "fs/promises";

const SingleEventPage = (props) => {
    const { loadedProduct } = props;

    if (!loadedProduct) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1>Single event Page</h1>
            <p>{loadedProduct.product}</p>
            <p>{loadedProduct.description}</p>
        </div>
    )
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export async function getStaticProps(context) {
    // console.log('CONTEXT: ', context);
    const { params } = context;
    const data = await getData();

    const product = data.products.find(product => product.id === params.eventId);

    if (!product) {
        return {
            notFound: true
        }
    }

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
    const data = await getData();
    const ids = data.products.map(product => product.id)
    const pathWithParams = ids.map((id) => ({ params: { eventId: id }}));

    return {
        paths: pathWithParams,
        // fallback is useful if we have millions of pages, this pre generate pages just in time,
        // when we click on link for example - pre generate is only in paths
        // is also 'blocking' value - you don't have to write return statement in case empty data, it's loaded but in late
        fallback: true
    }
}

export default SingleEventPage;