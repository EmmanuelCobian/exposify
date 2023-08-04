import Head from "next/head";

export default function SEO({ pageTitle, pageDescription }) {
    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <link rel="icon" href="../public/favicon.ico"/>
        </Head>
    )
} 
