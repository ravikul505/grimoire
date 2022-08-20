console.log('welcome to notes app . This is app.js')
showNotes();
//if user adds a note, add it to the local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(new Array(addTitle.innerHTML,addTxt.value));
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.innerHTML ="Add Occasion";
    //console.log(notesObj);
    showNotes();
})
// function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        //element.forEach(function(element1){
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element[0]}</h5>
            <p class="card-text">${element[1]}</p>      
            <button id="${index}"onclick="deleteNote(this.id)"class="btn btn-primary">remove note</button>
        </div>
    </div> `;
       // })
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `hmmm  , looks like there are no occasions yet ! `
    }
}

//function to delete a note
function deleteNote(index) {
    //console.log('I am deleting', index)
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input',function(){

    let inputVal = search.value.toLowerCase();
    //console.log("Input event fired !" , inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(e){
        let cardTxt = e.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt)
        if(cardTxt.includes(inputVal)){
            e.style.display = 'block';
        }
        else{
            e.style.display = 'none';
        }
    })
})
/*
1. Add Title
2. mark a note as importnat
3. separate notes by user
4. sync and host to with server

*/