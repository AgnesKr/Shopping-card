function CardProduct(id, image, name, quantity, price, colour, size) {
    this.id = id
    this.image = image
    this.colour = colour
    this.size = size
    this.name = name
    this.quantity = quantity
    this.price = price
    let pre = "",
        after = ""
    if(price.toString().length > 3) {
        //1 234 PLN
        //123 -> "123" -> ["1","2","3"] -> ["3","2","1"]
        price = price.toString().split("").reverse()
        for(let i = 0; i < price.length; i++) {
            if(i > 2) {
                pre += price[i]
                continue
            }
            after += price[i]
        }
        after = after.split("").reverse().join("")
    } else {
        after = price
    }
    document.querySelector(".container_photos").innerHTML +=
    `
    <div class="product">
        <h3>${name}</h3>
        <img src="${image}" />
        <h5><span style="margin-right: 10px">${pre}</span>${after} PLN</h5>
        <button class="button addProduct btn btn-primary" product='{"name": "${name}","price": "${this.price}", "image":"${image}", "colour": "${colour}", "size": "${size}", "id": "${id}", "quantity": "${quantity}"}'>Add</button>
    </div>
    `
}