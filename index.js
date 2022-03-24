let carrito = JSON.parse(localStorage.getItem('carrito'))

if (carrito == null) {
    carrito = [];
}

const tbody = document.querySelector('.tbody')

const clickButton = document.querySelectorAll('.button')
clickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

renderCarrito();

function addToCarritoItem(e) {
    e.preventDefault()

    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent
    const itemPrice = item.querySelector('.card-price').textContent
    const itemImg = item.querySelector('.card-img-top').src

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1,
    }
    
    addItemCarrito(newItem)
}

function addItemCarrito(newItem) {

    const inputElemento = document.getElementsByClassName('input__elemento');

    for(let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = inputElemento[i]
            inputValue.value++;
            console.log(carrito)
            return null
        }
    }   

    carrito.push(newItem)

    // GUardas el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito))

    renderCarrito()
}

// Cuando voy a iniciar a renderizarlo que este vacio el tbody por eso las comillas vacias
// Creamos el elemento tr y luego le colocamos una clase
function renderCarrito() {
    if (tbody == null) {
        return
    }

    tbody.innerHTML = ''

    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')

        const content = `
        
            <th scope="row">1</th>
            <td class="table__productos">
                <img src=${item.img} alt="">
                <h6 class="tittle">${item.title}</h6>
            </td>
            <td class="table__precios"><p>${item.precio}</p></td>
            <td class="table__cantidad">
                <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                <button class="delete btn btn-danger">x</button>
            </td>
        
        `

        tr.innerHTML = content
        
        tbody.append(tr)
    })
}