function getFav() {
    var f = localStorage.getItem("fav");
    return f ? JSON.parse(f) : [];
}

function saveFav(fav) {
    localStorage.setItem("fav", JSON.stringify(fav));
}

function getProduct(id) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == id) return products[i];
    }
    return null;
}

var box = document.getElementById("favBox");

function drawFav() {
    var fav = getFav();
    box.innerHTML = "";

    if (fav.length === 0) {
        box.innerHTML = '<p style="margin: 15px;">No favourites yet</p>';
        return;
    }

    for (var i = 0; i < fav.length; i++) {
        var p = getProduct(fav[i]);
        if (p) {
            box.innerHTML +=
                '<div class="card">' +
                '<img src="' + p.image + '">' +
                '<h4>' + p.title + '</h4>' +
                '<p>$' + p.price + '</p>' +
                '<button class="remove-btn" onclick="removeFav(' + p.id + ')">Remove</button>' +
                '</div>';
        }
    }
}

function removeFav(id) {
    var fav = getFav();
    fav = fav.filter(function(fid) { return fid != id; });
    saveFav(fav);
    drawFav();
}

drawFav();