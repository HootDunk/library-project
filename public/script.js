let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

//could add the background css styles here
Book.prototype.readStatus = function(rowID) {
    if (this.read === true){
        this.read = false;
    }
    else if (this.read === false){
        this.read = true;
    }
    db.collection('books').doc(rowID).update({
        read: this.read,
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
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
        });
}

function addCheckMark(tableRow, value, book){
        //create new cell for button
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
            book.readStatus(rowID)
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
        //document is now successfully created, we now use the docRef to retrieve the doc and call renderBook() to display it.
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                renderBook(doc);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    // addBookToLibrary(bookTitle, bookAuthor, pageNum, readStatus);
    document.getElementById("myForm").style.display = "none";
    //add something to clear the form here
});

function addToBookObject(doc){
    const book = new Book(doc.data().title, doc.data().author, doc.data().pages, doc.data().read);
    myLibrary.push(book);
    return book;
}

//appears to be working so far.  this sets the data id to the firebase id. 
function renderBook(doc){
    const tableBody = document.querySelector("#books");
    const tableRow = document.createElement('tr');
    tableRow.setAttribute("data-id", doc.id);
    tableRow.classList.add("table-row");
    tableBody.append(tableRow);
    
    // creates book object.
    // didn't think I would need it but it actually properly orders the data from the database.
    // There may be a way to preserve the order in the database but this works for now.
    let book = addToBookObject(doc);

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


//.then() is there bc call is asynchronous, takes some time for data retreival
//get refrence to all of the documents in books collection
db.collection('books').get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        console.log(doc.data())
        //passes document to renderBooks where info is rendered on the page
        renderBook(doc);
    })

});


// need to enable anonymous authentication




// Code from before implementing Firestore.  afraid to delete it just yet :)
// and it may still be useful to render things from the myLibrary object if I ever wanted
// to add a sorting ability and have the table render based on the sorted array. 
//creates row and renders it, returns table row.
// function renderRow(book, index){
//     const tableBody = document.querySelector("#books");
//     const tableRow = document.createElement('tr');
//     tableRow.setAttribute("data-id", index);
//     tableRow.classList.add("table-row");
//     tableBody.append(tableRow);

//     const values = Object.values(book);
//     values.forEach(value => {
        
//         if (value === true || value === false){
//             addCheckMark(tableRow, value, book)
//         }else{
//             const tableCell = document.createElement('td');
//             tableCell.textContent = value;
//             tableRow.append(tableCell)
//         }
//     });
//     return tableRow
// }


// function render(){
//     myLibrary.forEach((book, index) => {
//         let tableRow = renderRow(book, index);
//         addDeleteBtn(tableRow);
//     });
           
// }

// function addBookToLibrary(title, author, page, readStatus){
//     const book = new Book(title, author, page, readStatus);
//     myLibrary.push(book);

//     let tableRow = renderRow(book, (myLibrary.length - 1));
//     addDeleteBtn(tableRow);
// }

//pretty sure this was where I was going to do the color formating. not sure if i'll keep or delete it. 
// function updateTable(){
//     const tableRows = document.querySelectorAll(".table-row");
//     tableRows.forEach(row => {
//         console.log(row.getAttribute('data-id'))
//     });
// };