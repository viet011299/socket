var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var dulieu = [
  {
    mssv: "17021124",
    name: "ha xuan viet",
    class: "k62",
    phone: "0777771609",
    address: "Ho Tung Mau",

  },
  {
    mssv: "1703224",
    name: "nguyen van tuan",
    class: "k62",
    phone: "01645558585",
    address: "Dich Vong",

  },
  {
    mssv: "17021125",
    name: "le hong phong",
    class: "k63",
    phone: "0930089567",
    address: "Cau Giay",

  }
]
var port = (process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 6969);
server.listen(port, () => console.log('Server running in port ' + port));



io.on('connection', function (socket) {
  socket.on('private', function (data) {
    var kt = 0;
    dulieu.forEach((item, index) => {
      console.log(index)
      if (item.mssv === data) {
        socket.emit('news', item);
        kt = 1;
      }
    })
    if (kt == 0) {
      socket.emit('news');
    }
  });

  socket.on('show', function (data) {
    socket.emit('show_all', dulieu);

  });
});

app.get('/', (req, res) => {
  res.sendFile('test-socket-client.html', { "root": __dirname });
})