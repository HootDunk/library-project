
let myLibrary = [];


function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

}


Book.prototype.readStatus = function() {
    if (this.read === true){
        this.read = false;
    }
    else if (this.read === false){
        this.read = true;
    }  
}


function addDeleteBtn(tableRow){
        //create new cell for button
        const tableCell = document.createElement('td');
        tableRow.append(tableCell);
        //create table button, add text and class, add to table cell
        const tableButton = document.createElement('button');
        tableButton.textContent = 'delete';
        tableButton.classList.add("delete-button");
        tableCell.append(tableButton);
        //add event listener to table button
        tableButton.addEventListener('click', () => {
            const id = tableRow.getAttribute('data-id');
            const row = document.querySelector(`[data-id='${id}']`);
            row.remove();
            db.collection('books').doc(id).delete();

            //rowID now longer correspondes to location in array
            // will need to consider adding a doc.id attribute to the book object or something.
            // delete myLibrary[rowID];
        });
}



function addBookToLibrary(title, author, page, readStatus){
    const book = new Book(title, author, page, readStatus);
    myLibrary.push(book);

    let tableRow = renderRow(book, (myLibrary.length - 1));
    addDeleteBtn(tableRow);
}

//pretty sure this was where I was going to do the color formating. not sure if i'll keep or delete it. 
function updateTable(){
    const tableRows = document.querySelectorAll(".table-row");
    tableRows.forEach(row => {
        console.log(row.getAttribute('data-id'))
    });
};

function addCheckMark(tableRow, value, book){
        //create new cell for button
        console.log(value)
        const tableCell = document.createElement('td');
        tableRow.append(tableCell);
        tableCell.classList.add("table-checkbox");
        //create table button, add text and class, add to table cell
        const checkbox = document.createElement('input');
        // Assigning the attributes 
        // to created checkbox 
        checkbox.type = "checkbox"; 
        checkbox.name = "name";
        checkbox.checked = value;
        tableCell.append(checkbox);
        checkbox.addEventListener("click", () => {
            const rowID = tableRow.getAttribute('data-id');
            book.readStatus()

        });
}

//creates row and renders it, returns table row.
function renderRow(book, index){
    const tableBody = document.querySelector("#books");
    const tableRow = document.createElement('tr');
    tableRow.setAttribute("data-id", index);
    tableRow.classList.add("table-row");
    tableBody.append(tableRow);

    const values = Object.values(book);
    values.forEach(value => {
        
        if (value === true || value === false){
            addCheckMark(tableRow, value, book)
        }else{
            const tableCell = document.createElement('td');
            tableCell.textContent = value;
            tableRow.append(tableCell)
        }
    });
    return tableRow
}


function render(){
    myLibrary.forEach((book, index) => {
        let tableRow = renderRow(book, index);
        addDeleteBtn(tableRow);
    });
           
}

const addBookBtn = document.querySelector('.open-button');
addBookBtn.addEventListener('click', () => {
    document.getElementById("myForm").style.display = "block";
});

const closeForm = document.querySelector('.btn-close');
closeForm.addEventListener('click', () => {
    document.getElementById("myForm").style.display = "none";
})


const submitBtn = document.querySelector('.btn-submit');
submitBtn.addEventListener('click', () => {
    
    const bookTitle = document.querySelector("[name='title']").value;
    const bookAuthor = document.querySelector("[name='wtf']").value;
    const pageNum = document.querySelector("[name='pages']").value;
    const readStatus = document.querySelector("[name='read']").checked;

    //adds book to firebase
    db.collection("books").add({
        title: bookTitle,
        author: bookAuthor,
        pages: pageNum,
        read: readStatus,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

    addBookToLibrary(bookTitle, bookAuthor, pageNum, readStatus);
    document.getElementById("myForm").style.display = "none";

});

// To test add book
// addBookToLibrary("The Hobbit", "J.R.R Tolkein", 675, false);
// addBookToLibrary("The Return of the King", "Tolkein", 876, false);

// To test Render
// const book1 = new Book('"The Hobbit"', "J.R.R Tolkein", 675, true);
// const book2 = new Book('"The Return of the King"', " J.R.R Tolkein", 876, true);
// const book3 = new Book ('"Hyperion"', "Dan Simmons", 456, true);
// const book4 = new Book('"The Fall of Hyperion"', "Dan Simmons", 345, false)
// myLibrary.push(book1);
// myLibrary.push(book2);
// myLibrary.push(book3);
// myLibrary.push(book4);
// render();



 


// myLibrary.forEach((book) => {
    //this is how to add a book to the data base, will need to use later. 
//     db.collection("books").add({
//         title: book.title,
//         author: book.author,
//         pages: book.pages,
//         read: book.read,
//     })
//     .then(function(docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });
// });

//appears to be working so far.  this sets the data id to the firebase id. 
function renderBooks(doc){
    const tableBody = document.querySelector("#books");
    const tableRow = document.createElement('tr');
    tableRow.setAttribute("data-id", doc.id);
    tableRow.classList.add("table-row");
    tableBody.append(tableRow);
    
    // may not need anymore. oh wait probably will bc the order thing, hmmmm.
    const book = new Book(doc.data().title, doc.data().author, doc.data().pages, doc.data().read);
    myLibrary.push(book);

    const values = Object.values(book);
    values.forEach(value => {
        
        if (value === true || value === false){
            addCheckMark(tableRow, value, book)
        }else{
            const tableCell = document.createElement('td');
            tableCell.textContent = value;
            tableRow.append(tableCell)
        }
    });
    addDeleteBtn(tableRow);
}


function addToBookObject(doc){
    const book = new Book(doc.data().title, doc.data().author, doc.data().pages, doc.data().read);
    myLibrary.push(book);
}

//.then() is there bc call is asynchronous, takes some time for data retreival
db.collection('books').get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
        renderBooks(doc);
    })
    // render();
});


//okay so the submit button now sends the new book to the data base
// the delete button corresponds to the rows doc.id and now deletes both the row and its
// document in the database
// all that is left is having it update the read status everytime it is toggled. 
// also github pages is all messed up so check in to that
// and try opening it on another pc to see if your records remain
// probably have to enable that anonymous login thing or whatever it was

