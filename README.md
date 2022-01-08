# Deploy a Node.JS Application to Heroku

This repository shows you how to use Okta in a Node.js application and how to deploy the application to Heroku. Please read [Deploy a NodeJs application to Heroku][blog] to see how it was created.

**Prerequisites:**

- [Node.js](https://nodejs.org/en/)
- [Heroku Account](https://signup.heroku.com/)
- [A github repository]()
- [Okta CLI](https://cli.okta.com)

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To run this example locally, run the following commands:

```bash
git clone https://github.com/nickolasfisher/Okta_Heroku
cd heroku-webapp
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI. 

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Type of Application: **1: Web**
- Framework of Application: **Other**
- Redirect URI: `https://localhost:3000/authorization-code/callback`
- Post Logout Redirect URI: `https://localhost:3000`

The application configuration will be printed to `.okta.env`.

```dotenv
export OKTA_OAUTH2_ISSUER="{yourOktaDomain}/oauth2/default"
export OKTA_OAUTH2_CLIENT_SECRET="{yourClientSecret}"
export OKTA_OAUTH2_CLIENT_ID="{yourClientId}"
```

Create a new file in your project folder called .env.  Copy the values to there

```dotenv
OKTA_OAUTH2_ISSUER={yourOktaDomain}/oauth2/default
OKTA_OAUTH2_CLIENT_SECRET={yourClientSecret}
OKTA_OAUTH2_CLIENT_ID={yourClientId}
APP_BASEURL=http://localhost:3000
```

Use `npm run start` to run the application.

### Publish to Heroku

Push the code to your github repository.  

Navigate to your [Heroku dashboard](https://dashboard.heroku.com/apps).

Click on **New** and then **Create new app**

Give you app a distinct name and then click **Create app**

In the app page, under *Deploy*, select *Deployment Method* **Github**

Connect your github account to Heroku.

Click **Enable Automatic Deploys**

Click **Deploy Branch** under *Manual Deploy* for your first time deploy

Under the *Settings* tab, find the *Domains* section.  Make note of your domain here.  

Under *Config Vars* click **Reveal Config Vars** and add the values for `APP_BASEURL`, which will be the URL you just noted.  

`OKTA_OAUTH2_CLIENT_ID` = {yourClientId}
`OKTA_OAUTH2_CLIENT_SECRET` = {yourClientSecret}
`OKTA_OAUTH2_ISSUER` = {yourOktaDomain}/oauth2/default

### Finish Okta Setup

Navigate back to your Okta dashboard

Find the application you created for this project and click **Edit** under *General Settings*

Under *Login*, find the setting for *Sign-in redirect URIs* and add the value for your app's base domain + `/authorization-code/callback`.  For example, mine looks like this:  `https://okta-heroku-webapp-nfisher.herokuapp.com/authorization-code/callback`

Under signout redirect, add a value for your applications domain.  Again, mine looks like this:  `https://okta-heroku-webapp-nfisher.herokuapp.com`

Navigate to your application, you should see the home page.  Try to login and see your profile then log out.

## Links

This example uses the following open source libraries from Okta:

* [Okta with NodeJs](https://developer.okta.com/code/nodejs/)
* [Okta OIDC Middleware](https://www.npmjs.com/package/@okta/oidc-middleware)
* [Okta CLI](https://github.com/okta/okta-cli)

## Help

Please post any questions as comments on the [blog post][blog], or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://developer.okta.com/blog/2021/xyz
