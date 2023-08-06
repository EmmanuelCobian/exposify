import Head from "next/head";

export default function SEO({ pageTitle, pageDescription }) {
    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <link rel="icon" href="../public/favicon.ico"/>
        </Head>
    )
} 
