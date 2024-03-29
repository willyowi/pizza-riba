var nameGen = function(size) {
  if (size==="1") {
    return "small"
  } else if (size==="2") {
    return "medium"
  } else if (size==="3") {
    return "large"
  } else if (size==="4") {
    return "Extra-large"
  }
}
var counter = 0

function Pizza(size, name) {
  this.ingredients = [];
  this.size = size;
  this.price = 1000;
  this.name = name;
}
Pizza.prototype.addTops = function(array) {
  for(i=0;i<array.length;i++) {
    this.ingredients.push(parseInt(array[i]));
  }
}
Pizza.prototype.calcCost = function() {
  for(i=0;i<this.ingredients.length;i++) {
    if ((this.ingredients[i]>=1)&&(this.ingredients[i]<=6)) {
      this.price +=50;
    } else if (this.ingredients[i]>=6 && this.ingredients[i]<=10){
      this.price +=50;
    }
  }
  if (this.size==="1") {
    this.price+=0
  } else if (this.size==="2") {
    this.price+=200
  } else if (this.size==="3") {
    this.price+=400
  } else if (this.size==="4") {
    this.price+=450
  }
  return this.price;
}
function Order() {
  this.items = [];
  this.grandTotal = 0;
}
var order = new Order;

Order.prototype.calcGTotal = function(total) {
  this.grandTotal += total;
}



$(document).ready(function() {
  $("form#pizza1").submit(function(event) {
    event.preventDefault();
    var pizzaSize = $("#size").val();
    var pizzaName = "A " + nameGen(pizzaSize)+" pizza";
    var pizza = new Pizza(pizzaSize, pizzaName);
    order.items.push(pizza);
    $(".jumbotron").slideToggle();
    $(".topsAdd").slideToggle();
  });
  $("form.toppings").submit(function(event) {
    event.preventDefault();
    var toppingsArr = []
    $("input:checkbox[name=topping]:checked").each(function(){
        toppingsArr.push($(this).val());
    });
    $('input:checkbox').prop('checked', false);
    order.items[counter].addTops(toppingsArr);
    var total = order.items[counter].calcCost();
    order.calcGTotal(total);
    var node = document.createElement("li");
    var textnode = document.createTextNode(order.items[counter].name);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
    counter++;
    $("#totalHere").text(order.grandTotal);
    $(".topsAdd").slideToggle();
    $(".thanks").show();
    $(".totalBox").show();
  });
  $("form#pizza2").submit(function(event) {
    event.preventDefault();
    var pizzaSize = $("#size2").val();
    var pizzaName = "A " + nameGen(pizzaSize)+" pizza";
    var pizza = new Pizza(pizzaSize, pizzaName);
    order.items.push(pizza);
    $(".thanks").slideToggle();
    $(".topsAdd").slideToggle();
  });
  $("#goToDelivery").click(function(event) {
    $(".thanks").slideToggle();
    $(".delivery").slideToggle();
  });
  $("form#new-address").submit(function(event) {
    event.preventDefault();
    $(".delivery").slideToggle();
    $(".totalBox").slideToggle();
    $(".goodbye").slideToggle();
    var orderName = $("input#name").val();
    var orderStreet = $("input#street").val();
    var orderCity = $("input#city").val();
    var orderState = $("input#state").val();

    $("#nameHere").text(orderName);
    $("#streetHere").text(orderStreet);
    $("#cityHere").text(orderCity);
    $("#stateHere").text(orderState)
    $("#finalTotalHere").text(order.grandTotal);
  });
});
