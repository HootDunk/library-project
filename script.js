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
            const rowID = tableRow.getAttribute('data-id');
            const row = document.querySelector(`[data-id='${rowID}']`);
            row.remove();
            delete myLibrary[rowID];
        });
}



function addBookToLibrary(title, author, page, readStatus){
    const book = new Book(title, author, page, readStatus);
    myLibrary.push(book);

    let tableRow = renderRow(book, (myLibrary.length - 1));
    addDeleteBtn(tableRow);
}


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
            console.log("we're in")
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

    addBookToLibrary(bookTitle, bookAuthor, pageNum, readStatus);
    document.getElementById("myForm").style.display = "none";

});

// To test add book
// addBookToLibrary("The Hobbit", "J.R.R Tolkein", 675, false);
// addBookToLibrary("The Return of the King", "Tolkein", 876, false);

// To test Render
const book1 = new Book('"The Hobbit"', "J.R.R Tolkein", 675, true);
const book2 = new Book('"The Return of the King"', " J.R.R Tolkein", 876, true);
const book3 = new Book ('"Hyperion"', "Dan Simmons", 456, true);
const book4 = new Book('"The Fall of Hyperion"', "Dan Simmons", 345, false)
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
render();

 
