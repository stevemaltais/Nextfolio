import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Meta Viewport pour le responsive */}
       

        {/* Fonts et CSS */}
        <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,300italic,300,100italic,100,400italic,500,500italic,700,900,900italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Oswald:400,300,700"
          rel="stylesheet"
          type="text/css"
        />

        {/* Script pour le SDK Facebook */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}',
                  cookie     : true,
                  xfbml      : true,
                  version    : '${process.env.NEXT_PUBLIC_FACEBOOK_API_VERSION}'
                });
                  
                FB.AppEvents.logPageView();   
              };

              (function(d, s, id){
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) {return;}
                 js = d.createElement(s); js.id = id;
                 js.src = "https://connect.facebook.net/en_US/sdk.js";
                 fjs.parentNode.insertBefore(js, fjs);
               }(document, 'script', 'facebook-jssdk'));
            `,
          }}
        />

        {/* Crédit */}
        <script
          className="Crédit"
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{
            __html: `<!-- Coding With Steve -->`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
