# Laravel React App for BigCommerce

This is a basic BigCommerce app with two screens, a catalog summary view and list of orders that can be cancelled, built using Laravel and React. 

It's meant to fast track your ability to take a concept for an app to something usable within the BigCommerce control panel. A live store can install this app while it runs locally.

A walkthrough going over the steps taken to produce this app, along with the steps required to create the app in BigCommerce, can be read [here](https://medium.com/p/711ceceb5006).

## Prerequisites & Installation

To ease PHP development and enable the app you develop to be easily shared, you’ll want to use Laravel Herd. Herd will handle installing PHP, Composer and other tools helpful for Laravel development. 
 - [Laravel Herd Installation Guide for Windows](https://herd.laravel.com/docs/windows/1/getting-started/installation)
 - [Laravel Herd Installation Guide for macOS](https://herd.laravel.com/docs/1/getting-started/installation)

To test on a BigCommerce store, you can create a free trial on bigcommerce.com or request a free sandbox store by [signing up to be a tech partner](https://www.bigcommerce.com/partners/).

## Getting Laravel and React Running Together

This is where we will create a baseline for future development: a simple application that loads at a specific URL in your browser and loads a React component instead of the default Laravel screen.

Download and install Laravel Herd from one of the links above in the prerequisite section.

Create a new Laravel codebase:

On MacOS
```bash
cd ~/Herd
laravel new laravel-react-bigcommerce-app
cd laravel-react-bigcommerce-app
herd open
```

or Windows
```bash
cd %USERPROFILE%\Herd
laravel new laravel-react-bigcommerce-app
cd laravel-react-bigcommerce-app
herd open
```

At this point in the Herd UI, you should see your new site in the Sites dialog. Instruct herd to serve the site over https with this step on [macOS](https://herd.laravel.com/docs/1/advanced-usage/securing-sites#via-the-gui) or [Windows](https://herd.laravel.com/docs/windows/1/advanced-usage/securing-sites#via-the-gui).

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

https://laravel-react-bigcommerce-app.test

## References

https://laravel.com/docs/10.x/installation#your-first-laravel-project
https://laravel.com/docs/10.x/starter-kits

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
