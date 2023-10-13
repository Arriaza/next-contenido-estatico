import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
// function with which pages are rendered
  static async getInitialProps(ctx) {
// allows us to create a style sheet but on the server side
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
// receives the APP component and its properties, this function allows us to pass more properties or behavior to the rendering of our documents.
// although we are looking to get the CSS styling of the child components of styled-components
          enhanceApp: App => props =>
// looks for the styles found inside the app, the argument must be given to the app
          sheet.collectStyles(<App {...props} />)
        })

        const initialProps = await Document.getInitialProps(ctx)

        return {
          ...initialProps,
          styles: (
            <>
            {initialProps.styles}
{/* we add the styles to the documents that are generated on the server side, either statically generated or
with serverSideRendering */}
            {sheet.getStyleElement()}
            </>
          )
        }

    }

    finally {
      // allow all components created with styled-components to work inside the app and avoid errors
      sheet.seal()
    }
  }
}
