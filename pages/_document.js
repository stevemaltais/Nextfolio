// /pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Favicon dynamique */}
        <link rel="icon" type="image/svg+xml" href="/assets/fav-icon.png" />

        {/* Préchargement des polices */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        />

        {/* Script SDK Facebook */}
        <script
          async
          defer
          crossOrigin="anonymous"
          src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=${process.env.NEXT_PUBLIC_FACEBOOK_API_VERSION}&appId=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&autoLogAppEvents=1`}
        ></script>

        {/* Crédit */}
        {/* <!-- Coding With Steve --> */}
      </Head>
      <body>
        <Main />
        <div id="modal-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}
