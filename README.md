# Laravel React App for BigCommerce

This is a basic BigCommerce app with two screens, a catalog summary view and list of orders that can be cancelled, built using Laravel and React. 

It's meant to fast track your ability to take a concept for an app to something usable within the BigCommerce control panel. A live store can install this app while it runs locally.

A walkthrough going over the steps taken to produce this app, along with the steps required to create the app in BigCommerce, can be read [here](https://medium.com/p/711ceceb5006).

## Installation

Before jumping in, you'll want to make sure you have the system requirements met:
- PHP ([Installation Guide](https://www.php.net/manual/en/install.php))
- Composer ([Installation Guide](https://getcomposer.org/doc/00-intro.md))
- Laravel ([Installation Guide](https://laravel.com/docs/5.8))
- Local SSL Cert (Recommend Valet or Homestead to ease set up)
  - Mac OS: Valet ([Installation Guide](https://laravel.com/docs/5.8/valet))
  - Windows / Linux: Homestead ([Installation Guide](https://laravel.com/docs/5.8/homestead))

To install PHP dependancies:

```bash
composer install
```
And JS dependancies:
```bash
npm install
```
To test on a BigCommerce store, you can create a free trial on bigcommerce.com or request a free sandbox store by [signing up to be a tech partner](https://www.bigcommerce.com/partners/).

## Usage
To compile JS assets:
```bash
npm run dev
```
After compiling the app should be reachable at the site you are hosting the app on locally. i.e https://laravel-react-bigcommerce-app.test/

When running the app outside of BigCommerce, setting the follow environment variable will cause the app to use the local API credential (also in the .env file):
```
APP_ENV=local
``` 
Likewise, setting it to production will use only the credentials received during the OAuth handshake when the app is install on the BigCommerce store:
```
APP_ENV=production
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
