# Тестовое задание Valantis

## React + TypeScript + Vite + SCSS

### deploy -> https://polite-malasada-fe9a37.netlify.app/

### Запуск проекта
1. npm install;
2. npm run dev;

# Задание

Используя предоставленный апи создать страницу, которая отображает список товаров.  
Для каждого товара должен отображаться его id, название, цена и бренд.

## Требования:
* выводить по 50 товаров на страницу с возможностью постраничного перехода (пагинация) в обе стороны.
* возможность фильтровать выдачу используя предоставленное апи по названию, цене и бренду

Если API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются.
Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос.