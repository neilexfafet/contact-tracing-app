<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/* Route::group(['middleware'=>['auth:sanctum']], function() {
    Route::post('logout', [LoginController::class, 'logout']);
}); */
/* Route::middleware('auth:sanctum')->get('/user', function(Request $request) {
    return $request->user()->with('getDetails');
    Route::post('logout', [LoginController::class, 'logout']);
}); */

Route::middleware('auth:sanctum')->group(function() {
    Route::get('user/{id}/details', [UserController::class, 'getAuthDetails']);
    Route::get('user/{id}/user-history', [UserController::class, 'establishmentTrace']);
    Route::get('user/{id}/establishment-history', [UserController::class, 'userTrace']);
    Route::post('/user/update-details/user', [UserController::class, 'updateDetailsUser']);
    Route::post('/user/update-details/establishment', [UserController::class, 'updateDetailsEstablishment']);
    Route::post('/user/update-login/user', [UserController::class, 'updateLoginUser']);
    Route::post('/user/update-password/user', [UserController::class, 'updatePasswordUser']);
    Route::post('/user/post-announcement', [UserController::class, 'post']);
    Route::get('/user/{id}/all-posts', [UserController::class, 'allPosts']);
    Route::post('/user/update-post', [UserController::class, 'updatePost']);
    Route::post('/user/delete-post', [UserController::class, 'deletePost']);
    Route::post('user/trace/user', [UserController::class, 'traceUser']);
    Route::post('user/trace/Establishment', [UserController::class, 'traceEstablishment']);
    Route::post('logout', [LoginController::class, 'logout']);
});

Route::get('users', [UserController::class, 'index']);
Route::post('login', [LoginController::class, 'login']);
Route::post('register/user', [LoginController::class, 'registerUser']);
Route::post('register/establishment', [LoginController::class, 'registerEstablishment']);
Route::get('find/{id}', [UserController::class, 'find']);

Route::get('/test', function() {
    return Str::random(20);
});
