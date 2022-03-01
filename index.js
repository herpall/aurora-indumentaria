const clickButton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

clickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

// Con closest se obtiene la clase mas cercana que sea 'card' que es la clase madre de la tarjeta
function addToCarritoItem(e) {
    const button = e.target
    const item = button.closest('.card') 
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.card-price').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1,
    }

    addItemCarrito(newItem)
}

// Le agrego al array de carrito el newItem
function addItemCarrito(newItem) {
    carrito.push(newItem)
    renderCarrito()
}

function renderCarrito() {
    // Cada vez que se ejecute el tbody, tiene que estar vacio
    tbody.innerHTML = ''
    // Vamos a hacer el cambio con el map dentro de carrito
    carrito.map(item => {
        // Creamos a tr que es la nueva fila (nuevo elemento o producto)
        const tr = document.createElement('tr')
        // Agregamos una clase al tr
        tr.classList.add('itemCarrito')
        // Agregaremos un contenido dentro del tr
        const Content = `
            <th scope="row">1</th>
            <td class="table__productos">
                <img src=${item.img} alt="">
                <h6 class="tittle">${item.title}</h6>
            </td>
            <td class="table__precios"><p>${item.price}</p></td>
            <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad}>
                <button class="delete btn btn-danger">x</button>
            </td>
        `

        // Aca decimos que al tr le agregamos content
        tr.innerHTML = Content
        // a tbody le agregamos el hijo tr
        tbody.append(tr)
    })
}