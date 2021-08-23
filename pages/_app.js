import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
     <div>
       <p>Some text</p>
       <Component {...pageProps} />
     </div>
  );
}

export default MyApp
