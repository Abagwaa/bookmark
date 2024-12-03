var inputSiteName = document.getElementById('bookmarkName');
var inputSiteUrl = document.getElementById('siteUrl');
var submitBtn = document.getElementById('sbtBtn');
var tableContent = document.getElementById('tableContent');
var alertDiv = document.getElementById('alertDiv');
var alertForm = document.getElementById('alertForm');

var bookMarks = JSON.parse(localStorage.getItem("bookMarks")) || []


function clear(){
    inputSiteName.value = "";
    inputSiteUrl.value = "";    
}

function deleteBookmark(index) {
    bookMarks.splice(index,1);
console.log(index);
showBookmark(bookMarks);
localStorage.setItem('bookMarks',JSON.stringify(bookMarks));

}


function addBookmark () {

    if(validateBookmark(inputSiteUrl)){
        var newBookmark = {
            siteName : inputSiteName.value,
            SiteUrl : inputSiteUrl.value
            };
        
            bookMarks.push(newBookmark);
            localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
        
            showBookmark(bookMarks);
            clear();
            alertForm.classList.add('d-none')


    }else{
        alertForm.classList.remove('d-none')
    }

    
}

submitBtn.addEventListener ("click",addBookmark);

function showBookmark (arr) {
    var box = ``;

    for(var i = 0; i < arr.length; i++){
       
box += `  <tr>
                        <td>${i + 1}</td>
                        <td>${arr[i].siteName}</td>
    <td><a href="${arr[i].SiteUrl}" class="btn btn-visit" target="_blank">Visit <i class="fa-solid fa-eye"></i></a></td>
                        <td> <button onclick="deleteBookmark(${i})" class="btn btn-delete">Delete <i class="fa-solid fa-trash-can"></i></button></td>
                    </tr>`
    }
    tableContent.innerHTML = box;
}

showBookmark(bookMarks);

function validateBookmark(element){
    let regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/;
    if (regex.test(element.value)){
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        alertDiv.classList.add('d-none')
        return true
    }else{
        element.classList.remove('is-valid')
        element.classList.add('is-invalid')
        alertDiv.classList.remove('d-none')
        return false

    }
}