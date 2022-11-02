<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Requirements

make sure you completed this requirement tools version!

-   PHP version >= **8.0.8**
-   Laravel Framework version >= **9.30.0**
-   NodeJS version >= **16.13.1**

## How to install

Clone the project first

```bash
git clone https://github.com/mhmdfaishal/fourtPOS.git
```

copy .env from .env.example

```bash
cp .env.example .env || copy .env.example .env
```

Install laravel packages

```bash
composer install
```

Generate new `APP_KEY`

```bash
php artisan key:generate
```

Create the database first! name of the database is `db_warzo`

Install node packages

```bash
npm install
```

Create symlink between storage and public folder

```bash
php artisan storage:link
```

Migrate all tables and seed

```bash
php artisan migrate --seed
```

Run server-side app

```bash
php artisan serve
```

Run client-side app

```bash
npm run hot
```

## Admin Account

```bash
Email: admin@warpos.co.id
Password: WarzoPOS2022!
```