function CardProduct(id, image, name, quantity, price, colour, size) {
    this.id = id
    this.image = image
    this.colour = colour
    this.size = size
    this.name = name
    this.quantity = quantity
    this.price = price

    document.querySelector(".container_photos").innerHTML += `
    <div>
        <img src="${image}" />
        <h3>${name}</h3>
        <h3>${price}</h3>
        <button class="button" product='{"name": "${name}","price": "${price}", "image":"${image}", "colour": "${colour}", "size": "${size}", "id": "${id}", "quantity": "${quantity}"}'>Add</button>
    </div>
    `
}