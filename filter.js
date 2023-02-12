import { data } from "./data.js"

const productContainer = document.querySelector('.products')
const searchInput = document.querySelector('.search')
const catsContainer = document.querySelector('.cats')
const priceRange = document.querySelector('.priceRange')
const priceValue = document.querySelector('.priceValue')

const showProducts = (filteredProducts) => {
  productContainer.innerHTML = filteredProducts.map(product => (
    `<div class="product">
      <img
        src='${product.img}'
        alt=""
      />
      <span class="name">${product.name}</span>
      <span class="priceText">$${product.price}</span>
    </div>`
  )).join('')
}

showProducts(data)

searchInput.addEventListener('keyup', e => {
  const value = e.target.value.toLowerCase()

  if (value) {
    showProducts(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1))
  } else {
    showProducts(data)
  }
})

const setCategories = () => {
  const allCats = data.map(item => item.cat)
  const categories = ['All', ...allCats.filter((item, index) => {
    return allCats.indexOf(item) === index
  })]

  catsContainer.innerHTML = categories.map(cat => (
    `
      <span class='cat'>${cat}</span>
    `
  )).join('')

  catsContainer.addEventListener('click', e => {
    const selectedCat = e.target.textContent

    selectedCat === 'All' ? showProducts(data) : showProducts(data.filter(item => item.cat === selectedCat))
  })
}

const setPrices = () => {
  const priceList = data.map(item => item.price)
  const minPrice = Math.min(...priceList)
  const maxPrice = Math.max(...priceList)

  priceRange.min = minPrice
  priceRange.max = maxPrice
  priceRange.value = maxPrice
  priceValue.textContent = `$${maxPrice}`

  priceRange.addEventListener('input', e => {
    priceValue.textContent = `$${e.target.value}`
    showProducts(data.filter(item => item.price <= e.target.value))
  })
}

setCategories()
setPrices()
