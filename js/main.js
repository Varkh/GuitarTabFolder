'use strict';

var app = angular.module('tabPage', []);

app.controller('TabulaturController', function(){
    this.tabInfo = tabInfo;
});

var tabInfo = {
    title: "Вона табулатура",
    band: "Плач Єремії",
    postedDate: "August 24, 2013 at 9:00 PM",
    tabInfo: "(Завтра прийде до кімнати) \nCлова: Кость Москалець \nМузика: Кость Москалець \nОбробка слів, переклад: Mishanya solo version, найкращий підбір"
};