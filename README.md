# Laravel React App for BigCommerce

This is a basic BigCommerce app with two screens, a catalog summary view and list of orders that can be cancelled, built using Laravel and React. 

It's meant to fast track your ability to take a concept for an app to something usable within the BigCommerce control panel. A live store can install this app while it runs locally.

A walkthrough going over the steps taken to produce this app, along with the steps required to create the app in BigCommerce, can be read [here](https://medium.com/p/711ceceb5006).

## Prerequisites & Installation

Before jumping in, you'll want to make sure you have the system requirements met:
- PHP ([Installation Guide](https://www.php.net/manual/en/install.php))
- Composer ([Installation Guide](https://getcomposer.org/doc/00-intro.md)) 
- Laravel ([Installation Guide](https://laravel.com/docs/10.x))

To ease PHP development and enable the app you develop to be easily shared, you’ll want to use either Valet or Homestead, depending on your OS:

- Local SSL Cert (Recommend Valet or Homestead to ease set up)
  - Mac OS: Valet ([Installation Guide](https://laravel.com/docs/10.x/valet))
  - Windows / Linux: Homestead ([Installation Guide](https://laravel.com/docs/10.x/homestead))

We’ll be using Valet for some of the steps below, but the functionality to host and share sites is similar across both Valet and Homestead. What’s more important in this tutorial is how to configure Laravel to use React and connect with BigCommerce.

To install PHP dependancies:

```bash
composer install
```
And JS dependancies:
```bash
npm install
```
To test on a BigCommerce store, you can create a free trial on bigcommerce.com or request a free sandbox store by [signing up to be a tech partner](https://www.bigcommerce.com/partners/).

## Getting Laravel and React Running Together

This is where we will create a baseline for future development: a simple application that loads at a specific URL in your browser and loads a React component instead of the default Laravel screen.

Create a new Laravel codebase
You can either use the Laravel command that creates the initial boilerplate for an app in the ~/Sites directory or use Composer:

```bash
composer global require laravel/installer
laravel new laravel-react-bigcommerce-app
```
or
```bash
composer create-project laravel/laravel laravel-react-bigcommerce-app
```

Visit the app address to make sure it’s live locally:

After the command above completes, we wiil need to set up the directory so Valet can serve the app securely.
```bash
cd laravel-react-bigcommerce-app
valet link
valet secure
```
You should now be able to visit the following URL in your browser and see the default Laravel welcome screen:

https://laravel-react-bigcommerce-app.test

## Set up React as the JS framework using Breeze and Inertia
Larvel Breeze provides a minimal and simple starting point for building a Laravel application, with authentication features. It's powered by Blade and Tailwind but can be configured as an SPA using Inertia. In this example we will power our frontend with react.

First let's install Breeze:
```bash
composer require laravel/breeze --dev
```
Then we install the react scaffolding:
```bash
php artisan breeze:install react
```
Note: this last command executed `npm install` so no need to run this command.

Lastly, get the application running:
```bash
npm run dev
```
a `Local` url should now be available in your console to visit your react application

http://127.0.0.1:5173/

## References

https://laravel.com/docs/10.x/installation#your-first-laravel-project
https://laravel.com/docs/10.x/starter-kits

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
