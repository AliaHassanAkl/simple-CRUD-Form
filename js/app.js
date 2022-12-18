// set variables
var getProductName= document.getElementById('productName');
var getProductPrice= document.getElementById('price');
var getProductCategory= document.getElementById('category');
var getProductDiscription = document.getElementById('discription');
var getInputs = document.getElementsByClassName('form-control');
var searchkey = document.getElementById('searchKey');
var products=[];
var btnAdd = document.getElementById('btnAdd');
var currentIndex="";
var nameAlert = document.getElementById('nameAlert')

// retrieve and storage
if(JSON.parse(localStorage.getItem('productslist'))!=null){;
    products=JSON.parse(localStorage.getItem('productslist'));
    showProducts();
    }

//function to add new products
var addProduct= function(){
    var product= {
        name: getProductName.value ,
        Price: getProductPrice.value, 
        category: getProductCategory.value,
        discription: getProductDiscription.value

    };
    products.push(product);
    localStorage.setItem("productslist",JSON.stringify(products));

}

// function to show new products
function showProducts(){
    var productList='';
    for(var i=0;i<products.length;i++){
        productList+=`<tr>
                      <td>${products[i].name}</td> 
                      <td>${products[i].Price}</td> 
                      <td>${products[i].category}</td> 
                      <td>${products[i].discription}</td> 
                      <td><button class="btn btn-warning" onclick="getCurrentProduct(${i})" >update</button></td>
                      <td><button class= "btn btn-danger" onclick="deleteProduct(${i})" >delete</button></td>
                      </tr>`;
        }
    document.getElementById('tableBody').innerHTML=productList;
    }
// reset function 
var resetValues= function(){
    for(var i =0; i<getInputs.length; i++){
        getInputs[i].value='';
    }
}
// button function 
btnAdd.onclick= function(){
    if(btnAdd.innerHTML==' Add product'){
        addProduct();
    }else {
        updateProduct();
    }
    
    showProducts();
    resetValues();
}
var deleteProduct=function(index){
    products.splice(index,1);
    showProducts();
    localStorage.setItem("productslist",JSON.stringify(products));
} 
//search key
searchkey.onkeyup=function(){
    searchtxt=this.value;
    var productList='';
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(searchtxt.toLowerCase())){
            productList+=`<tr>
                      <td>${products[i].name}</td> 
                      <td>${products[i].Price}</td> 
                      <td>${products[i].category}</td> 
                      <td>${products[i].discription}</td> 
                      <td><button class="btn btn-warning"onclick="getCurrentProduct(${i})">update</button></td>
                      <td><button class= "btn btn-danger" onclick="deleteProduct(${i})" >delete</button></td>
                      </tr>`;
        }
    }
    document.getElementById('tableBody').innerHTML=productList;
}
// updata product 
function getCurrentProduct(index){
    //get product data to be update
    currentIndex=index
    var currentProduct=products[index];
    getProductName.value=currentProduct.name;
    getProductPrice.value=currentProduct.Price;
    getProductCategory.value=currentProduct.category;
    getProductDiscription.value=currentProduct.discription;
    // change button 
    btnAdd.innerHTML=`update`
}
function updateProduct(){
    console.log(currentIndex);
    var product= {
        name: getProductName.value ,
        Price: getProductPrice.value, 
        category: getProductCategory.value,
        discription: getProductDiscription.value

    };
    products[currentIndex]=product;
    // send to local storage
    localStorage.setItem("productslist",JSON.stringify(products));
}
// validation functions 
productName.onkeyup= function(){
    var nameREJEX=/^[A-Za-z- ]{3,10}$/
    if( nameREJEX.test(productName.value)){
        //valid
        btnAdd.removeAttribute('disabled');
        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');


    }else {
        //invalid
        btnAdd.disabled=true;
        productName.classList.add('is-invalid');
        productName.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
    }
}
price.onkeyup= function(){
    var priceREJEX=/^[0-9]{1,7}$/;
    if(priceREJEX.test(price.value)){
        //valid
        btnAdd.removeAttribute('disabled');
        price.classList.add('is-valid');
        price.classList.remove('is-invalid');
        priceAlert.classList.add('d-none');
    }else{
        //invalid
        btnAdd.disabled=true;
        price.classList.add('is-invalid')
        price.classList.remove('is-valid')
        priceAlert.classList.remove('d-none')
    }
};
category.onkeyup= function(){
    var categoryREJEX=/^[A-Za-z- ]{1,20}$/;
    if(categoryREJEX.test(category.value)){
        //valid
        btnAdd.removeAttribute('disabled');
        category.classList.add('is-valid')
        category.classList.remove('is-invalid')
        categoryAlert.classList.add('d-none')
    }else{
        //invalid
        btnAdd.disabled=true;
        category.classList.add('is-invalid')
        category.classList.remove('is-valid')
        categoryAlert.classList.remove('d-none')
    }
};   
discription.onkeyup= function(){
    var discriptionREJEX=/^[A-Za-z- ]{1,100}$/;
    if(discriptionREJEX.test(discription.value)){
        //valid
        btnAdd.removeAttribute('disabled');
        discription.classList.add('is-valid')
        discription.classList.remove('is-invalid')
        discriptionAlert.classList.add('d-none')
    }else{
        //invalid
        btnAdd.disabled=true;
        discription.classList.add('is-invalid')
        discription.classList.remove('is-valid')
        discriptionAlert.classList.remove('d-none')
    }
};   