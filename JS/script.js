var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productdescription");
var productImage = document.getElementById("productImage");
var productList = [];

function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
    image: "./images/mrs_Pants.jpg",
  };
  productList.push(product);
  console.log(productList);
}
