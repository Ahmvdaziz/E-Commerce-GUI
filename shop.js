function getCart() {
    var c = localStorage.getItem("cart");
    return c ? JSON.parse(c) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getFav() {
    var f = localStorage.getItem("fav");
    return f ? JSON.parse(f) : [];
}

function saveFav(fav) {
    localStorage.setItem("fav", JSON.stringify(fav));
}

var container = document.getElementById("products");

function drawProducts(list) {
    container.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        var p = list[i];
        var d = document.createElement("div");
        d.className = "card";
        d.innerHTML =
            '<img src="' + p.image + '">' +
            '<h4>' + p.title + '</h4>' +
            '<p>$' + p.price + '</p>' +
            '<button type="button" class="btn" onclick="addToCart(' + p.id + ')">Add to Cart</button>' +
            '<button type="button" class="btn" onclick="addToFav(' + p.id + ')">❤️</button>';
        container.appendChild(d);
    }
}

drawProducts(products);

function addToCart(id) {
    var cart = getCart();
    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].qty++;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({ id: id, qty: 1 });
    }
    saveCart(cart);
    alert("Product added to cart!");
}

function addToFav(id) {
    var fav = getFav();
    if (fav.indexOf(id) === -1) {
        fav.push(id);
        saveFav(fav);
        alert("Added to Favourites ❤️");
    } else {
        alert("Already in Favourites");
    }
}

function search() {
    var val = document.getElementById("searchBox").value.toLowerCase();
    var result = products.filter(function(p) {
        return p.title.toLowerCase().includes(val);
    });
    drawProducts(result);
}