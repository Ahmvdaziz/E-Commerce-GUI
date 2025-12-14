// دوال الـ storage و getProduct داخل cart.js
function getCart() {
    var c = localStorage.getItem("cart");
    return c ? JSON.parse(c) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getProduct(id) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == id) return products[i];
    }
    return null;
}

var box = document.getElementById("cartBox");

function drawCart() {
    var cart = getCart();
    var total = 0;
    box.innerHTML = "";

    if (cart.length === 0) {
        box.innerHTML = '<p style="margin: 15px;">Your cart is empty</p>';
    }

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var p = getProduct(item.id);
        if (!p) continue;
        var sub = p.price * item.qty;
        total += sub;

        box.innerHTML +=
            '<div class="card">' +
            '<img src="' + p.image + '">' +
            '<h4>' + p.title + '</h4>' +
            '<button class="qty-btn" onclick="dec(' + item.id + ')">-</button> ' +
            item.qty +
            ' <button class="qty-btn" onclick="inc(' + item.id + ')">+</button>' +
            '<p>Subtotal: $' + sub + '</p>' +
            '<button class="remove-btn" onclick="removeItem(' + item.id + ')">Remove</button>' +
            '</div>';
    }

    document.getElementById("total").innerHTML = "Total: $" + total;
}

function inc(id) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].qty++;
            break;
        }
    }
    saveCart(cart);
    drawCart();
}

function dec(id) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].qty--;
            if (cart[i].qty <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveCart(cart);
    drawCart();
}

function removeItem(id) {
    var cart = getCart();
    cart = cart.filter(function(item) { return item.id != id; });
    saveCart(cart);
    drawCart();
}

drawCart();