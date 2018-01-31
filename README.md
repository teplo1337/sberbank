# sberbank 

## Node Server: 
```
http://sber.kekcheburek.ru/api .../api/rooms
```

## Angular: 

```
http://sber.kekcheburek.ru/ .../roomseditor
```

app.component => reservation\src\app\app <br>
date-selector.component => reservation\src\app\date-selector <br>
date-editor.component => reservation\src\app\date-editor <br>
date-table.component => reservation\src\app\date-table <br>
rooms-editor.component => reservation\src\app\rooms-editor <br>

service      => reservation\src\app\reservation.service <br>
node-server  => server.js <br>
## mongodb:
```
'mongodb://root:1@ds046667.mlab.com:46667/room-reservation' <br>
db.collection data: 
```
event:
```
{
    "_id": {
        "$oid": "5a69810480d6ed2d4ced0f15"
    },
    "day": "2018-01-25",
    "title": "Слушать Грефа",
    "room_id": 0,
    "who": "Отдел кадров",
    "start_time": 12,
    "end_time": 23
}
```

## rooms can be any number:
```
{
    "_id": {
        "$oid": "5a69ba75f36d286a1cb3360f"
    },
    "type": "rooms",
    "data": [
        "Комната 1",
        "Комната 2",
        "Комната 3"
    ]
}
```



## nginx conf:
```
server {
        listen       80;
        server_name  sber.kekcheburek.ru;
        index index.html;
        root sberbank/reservation/dist;
        location / {
            #proxy_pass http://192.168.1.195:4200/;
            try_files $uri /$uri /index.html;          
       }  
       location = /api {
           proxy_pass http://localhost:8890/api;
       }
        location ^~ /api/ {
           proxy_pass http://localhost:8890/api/;
       }
    }
```
## test task:
```
Бронирование переговорных комнат

Задача:
Реализовать одностраничное приложение системы бронирования переговорных комнат в режиме
реального времени.

Логика работы приложения:
CRUD для переговорных комнат.
Отображение доступных дат для бронирования переговорных комнат.
Забронированные даты должны сохраняться и быть видны при перезагрузке страницы.

Условия:
 Разработка фронт-энда — AngularJS/HTML5/CSS3
 Кроссбраузерная верстка
 Приложение должно быть адаптировано под мобильные устройства.

Будет плюсом:
 Использование препроцессоров: LESS/SASS
 Использование ES6/TypeScript
 Использование сборщика проектов

Результат разработки должен быть представлен в виде репозитория с пошаговыми коммитами
разработчика.

```
