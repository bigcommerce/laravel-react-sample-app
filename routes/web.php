<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\MainController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/list', function () {
    return Inertia::render('List');
});

Route::group(['prefix' => 'auth'], function () {
    Route::get('install', [MainController::class, 'install']);

    Route::get('load', [MainController::class, 'load']);

    Route::get('uninstall', function () {
        echo 'uninstall';
        return app()->version();
    });

    Route::get('remove-user', function () {
        echo 'remove-user';
        return app()->version();
    });
});

Route::any('/bc-api/{endpoint}', [MainController::class, 'proxyBigCommerceAPIRequest'])
    ->where('endpoint', 'v2\/.*|v3\/.*');

require __DIR__.'/auth.php';
