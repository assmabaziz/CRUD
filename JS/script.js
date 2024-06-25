// ============================ Global Variables =================================
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productdescription");
var productImage = document.getElementById("productImage");
var productList = []; // array where we push new prodcts to save them
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var currentIndex;

if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayProduct(productList);
}
//=========================== Function To Add New Product =====================================================

function addProduct() {
  if (
    /^[A-Z][a-z0-9]{3,10}$/.test(productName.value) == true &&
    /^(1[0-9]|20)$/.test(productPrice.value) == true &&
    /^(TV|Mobile|Screen|Laptop|other)$/i.test(productCategory.value) == true &&
    /^.{1,30}$/.test(productDescription.value) == true
  ) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
      image: `./images/${productImage.files[0].name}`,
    };
    if (productImage.files[0] == undefined) {
      product.image = "./images/mr_pants3.jpg";
    }
    productList.push(product);
    updatLocalStorage();
    updateInputValue();
    displayProduct(productList); //cette foction va etre appelee apres l'ajout du produit dans le tableau
    // console.log(productList);
    alertInfo.classList.add("d-none");
  } else {
    alertInfo.classList.remove("d-none");
  }
}

//=========================== Function To Display Product Added by the function Above =======================

function displayProduct(list) {
  var newProduct = " ";
  for (var i = 0; i < list.length; i++) {
    newProduct += `
    <div class="col-md-3">
        <figure class ="text-white border border-2 border-info rounded-2 overflow-hidden">
          <img src="${list[i].image}" class="mb-3 d-block w-100" alt="Mr pants" />
          <figcaption class="p-3">
            <h2>Name: ${list[i].name}</h2>
            <h3 class="fs-4">Price: $ ${list[i].price}</h3>
            <p>Description: ${list[i].description}</p>
            <h4 class="fs-6">Category:  ${list[i].category}</h4>
            <button onclick="getDataToUpdate(${i})" class="btn btn-outline-warning w-100 mb-3">Update</button>
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100" >Delete</button>
          </figcaption>
        </figure>
      </div>
  `;
    // les infos du produits doivent etres dynamiques
  }
  document.getElementById("addedProduct").innerHTML = newProduct; // chaque fois on clique le btn il remplace le contenu du x par les infos ecrits dans INPUT
}

//=========================== Function To Update Input Value =====================================================
function updateInputValue(config) {
  productName.value = config ? config.name : null;
  productPrice.value = config ? config.price : null;
  productCategory.value = config ? config.category : null;
  productDescription.value = config ? config.description : null;
}
//=========================== Function To Delete Product =====================================================

function deleteProduct(index) {
  productList.splice(index, 1);
  // console.log(productList);
  updatLocalStorage();
  displayProduct(productList);
}

//=========================== Function Get Data To Update =====================================================

function getDataToUpdate(index) {
  updateInputValue(productList[index]);
  currentIndex = index;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

//=========================== Function To Update Data =====================================================

function updateProduct() {
  productList[currentIndex].name = productName.value;
  productList[currentIndex].price = productPrice.value;
  productList[currentIndex].category = productCategory.value;
  productList[currentIndex].description = productDescription.value;
  displayProduct(productList);
  updatLocalStorage();
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  updateInputValue();
}

//=========================== Function To Update Local Storage =====================================================

function updatLocalStorage() {
  localStorage.setItem("productList", JSON.stringify(productList));
}

//=========================== Function To Search Items =====================================================
function search(searchValue) {
  var searchList = [];
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
      productList[i].newName = productList[i].name
        .toLowerCase()
        .replace(
          searchValue.toLowerCase(),
          `<span class="text-danger">${searchValue}</span>`
        );
      // console.log(productList[i].name);
      searchList.push(productList[i]);
    }
  }
  displayProduct(searchList);
}

//=========================== Function To Validate Inputs =====================================================

function validateProductInput(element) {
  var regex = {
    productName: /^[A-Z][a-z0-9]{3,10}$/,
    productPrice: /^(1[0-9]|20)$/,
    productCategory: /^(TV|Mobile|Screen|Laptop|other)$/i,
    productdescription: /^.{10,30}$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
  }
}
