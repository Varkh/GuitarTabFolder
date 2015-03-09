'use strict';

var app = angular.module('tabPage', []);

app.controller('TabulaturController', function(){
    this.tabInfo = tabInfo;
});

var tabInfo = {
    title: "Вона табулатура",
    band: "Плач Єремії",
    postedDate: "August 24, 2013 at 9:00 PM",
    otherInfo: [
        "(Завтра прийде до кімнати)",
        "Cлова: Кость Москалець",
        "Музика: Кость Москалець",
        "Обробка слів, переклад: Mishanya solo version",
        "найкращий підбір"
    ],
    body: "",
    comments: [
        {
            title: "Start Bootstrap",
            postedDate: "August 23, 2014 at 9:30 PM",
            text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
            subcomments: []
        },
        {
            title: "Start Bootstrap",
            postedDate: "August 25, 2014 at 9:30 PM",
            text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
            subcomments: [
                {
                    title: "Nested Start Bootstrap",
                    postedDate: "August 26, 2014 at 9:30 PM",
                    text: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.",
                }
            ]
        }
    ]
};