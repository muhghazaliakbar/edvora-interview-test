import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="p-10 bg-stone-800">
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument