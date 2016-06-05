function Clicker () {
  this.value = 0;
  this.update = new angular.EventEmitter();
  this.onClick = function () {
    this.value++;
    this.update.next({value: this.value});
  }
  this.onMouseout = function () {
    this.value = 0;
    this.update.next({value: this.value});
  }
}

Clicker.annotations = [
  new angular.ComponentAnnotation({
    events: ['update'],
    selector: 'clicker'
  }),
  new angular.ViewAnnotation({
    templateUrl: 'clicker.html'
  })
];

function App () {
  this.clickCount = 0;
  this.onUpdate = function (event) {
    this.clickCount = event.value;
  }
}

App.annotations = [
  new angular.ComponentAnnotation({
    selector: 'app'
  }),
  new angular.ViewAnnotation({
    directives: [Clicker],
    templateUrl: 'app.html'
  })
];

document.addEventListener('DOMContentLoaded', function () {
  angular.bootstrap(App);
});
