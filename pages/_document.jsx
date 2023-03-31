import Document,{Html,Head,Main,NextScript} from "next/document";

// to add lang attribute, overlays
class MyDocument extends Document{
    render(){
        return (
            <Html lang='en'>
                <Head>
                    <body>
                        <div id='overlays'></div>
                        <Main/>
                        <NextScript/>
                    </body>
                </Head>
            </Html>
        );
    }
}

export default MyDocument;