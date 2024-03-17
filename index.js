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
    let productoNuevo = true;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() == newItem.title.trim()) {
            productoNuevo === false; // El producto ya estaba en el carrito

            carrito[i].cantidad++;
            console.log(carrito)
            break;
        }
    } 

    // Si el producto es nuevo, lo agrego al carrito
    if (productoNuevo === true) {
        carrito.push(newItem) 
    }

    renderCarrito()
    guardarCarrito()
}


function renderCarrito() {
    if (tbody == null) {
        return
    }

    tbody.innerHTML = ''

    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')

        const content = `
        
            <th scope="row"></th>
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

        tr.querySelector('.delete').addEventListener('click', removeItemCarrito)
        tr.querySelector('.input__elemento').addEventListener('change', sumaCantidad)
        
    })

    carritoTotal () 
    
}

function carritoTotal () {
    let Total = 0
    let itemTotalCart = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ""))
        Total = Total + precio*item.cantidad
    })

    itemTotalCart.innerHTML = `Total $${Total}`

    const compra = document.querySelector(".btn-compra")

    compra.addEventListener('click', finalizacion)

    function finalizacion () {
        if (carrito.length == 0) {
            alert("No hay productos seleccionados")
        } else {
            alert('Gracias por su compra!');

            vaciarCarrito();
            guardarCarrito();

            tbody.remove();
            itemTotalCart.innerHTML = `Total $0`;
        }
    }
    
}

function removeItemCarrito (e) {
    buttonDelete = e.target
    const tr = buttonDelete.closest('.itemCarrito')
    const title = tr.querySelector('.tittle').textContent

    for(i = 0; i<carrito.length; i++) {
        if(carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }
    
    tr.remove()
    
    carritoTotal() 
    guardarCarrito()
}

function sumaCantidad (e) {
    const sumaInput = e.target
    const tr = sumaInput.closest('.itemCarrito')
    const title = tr.querySelector('.tittle').textContent
    carrito.forEach(item => {
        if(item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
        }
    })
}

function vaciarCarrito() {
    carrito = [];
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}



// let subMenuBtn = document.querySelector(".subMenu");
// let menuChico = document.querySelector(".ul2");

// if(screen.width < 500){
    
//     subMenuBtn.addEventListener('click', (e) => {
//         e.preventDefault();

//         menuChico.classList.toggle('ul2-visible');
//         let height = 0; 
//         if(menuChico.clientHeight == "0"){
//             height = menuChico.scrollHeight;
//         }

//         menuChico.style.height = `${height}px`
// });
// };

// let itemsSubMenu = document.querySelectorAll(".ul2 li");

// // Iterar sobre cada elemento y agregar un evento de clic
// itemsSubMenu.forEach(item => {
//     item.addEventListener('click', (e) => {
//         // Obtener la URL de la página a la que se debe redirigir
//         let url = item.getAttribute('data-url');
//         // Redirigir a la URL
//         window.location.href = url;
//     });
// });

let subMenuBtn = document.querySelector(".subMenu");
let menuChico = document.querySelector(".ul2");

if(screen.width < 500){
    subMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();

        menuChico.classList.toggle('ul2-visible');
        let height = 0; 
        if(menuChico.clientHeight == "0"){
            height = menuChico.scrollHeight;
        }

        menuChico.style.height = `${height}px`;
    });
} else {
    subMenuBtn.addEventListener('mouseenter', () => {
        menuChico.classList.add('ul2-visible');
    });

    subMenuBtn.addEventListener('mouseleave', () => {
        menuChico.classList.remove('ul2-visible');
    });
}

let itemsSubMenu = document.querySelectorAll(".ul2 li");

itemsSubMenu.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que la página se desplace hacia arriba
        let url = item.querySelector('a').getAttribute('href');
        window.location.href = url;
    });
});
