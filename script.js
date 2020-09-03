let myLibrary = [];


//constructor for "Book" object
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

}

//update this toggleReadStatus function once you add the checkbox button and checkbox event listener.
Book.prototype.readStatus = function() {
    console.log(this.read)
}

//okay so add a button for read status else where
//then use this prototype to toggle a books read status (probs will just flip the boolean value)
//not 100% sure where this will get called but i'm expecting it to be in the event listener.
Book.prototype.updateReadStatus = function() {
    myLibrary.forEach(book => {
        book.readStatus()
    })
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


// okay so this could either be used to update the data id's or to add the odd number class.
// I'm thinking that the addBookToLibrary function would still be best for adding html.
function updateTable(){
    // const tableBody = document.querySelector("#books");
    const tableRows = document.querySelectorAll(".table-row");
    tableRows.forEach(row => {
        console.log(row.getAttribute('data-id'))
    });
};

function addCheckMark(tableRow){
        //create new cell for button
        const tableCell = document.createElement('td');
        tableRow.append(tableCell);
        //create table button, add text and class, add to table cell
        const checkbox = document.createElement('input');
        // Assigning the attributes 
        // to created checkbox 
        checkbox.type = "checkbox"; 
        checkbox.name = "name"; 
        checkbox.value = "value"; 
        checkbox.id = "id";
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
        const tableCell = document.createElement('td');
        tableCell.textContent = value;
        tableRow.append(tableCell)

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

// will need to get this to pull all of the info from the form and pass it to the updated addBookToLibrary function.
const submitBtn = document.querySelector('.btn-submit');
submitBtn.addEventListener('click', () => {
    
    const bookTitle = document.querySelector("[name='title']").value;
    const bookAuthor = document.querySelector("[name='wtf']").value;
    const pageNum = document.querySelector("[name='pages']").value;
    const readStatus = document.querySelector("[name='read']").checked;

    addBookToLibrary(bookTitle, bookAuthor, pageNum, readStatus);
    document.getElementById("myForm").style.display = "none";
    //could create a function that changes the text in the Add Book button
    // to something like submitted! and then have it enlarge and change back after through seconds

});

// To test add book
// addBookToLibrary("The Hobbit", "J.R.R Tolkein", 675, false);
// addBookToLibrary("The Return of the King", "Tolkein", 876, false);

// To test Render
const book1 = new Book("The Hobbit", "J.R.R Tolkein", 675, false);
const book2 = new Book("The Return of the King", "Tolkein", 876, false);
myLibrary.push(book1);
myLibrary.push(book2);
render();



// Notes
 
// also need to puzzle out the Read (status) column.  Need it to change on click.  So will need an event listener that changes the
// boolean value on click.  and then changes the element in the document.

// can use the index to add a class to each odd numbered tablerow/cell. this class will change the background color. 



// to do the alternating table colors, use something other then delete so that indexs get reset.  then write a function that
// will update the classes to set the background colors.

//lost the og styling inspiration but i found another https://georgius17.github.io/library/

// newest issue: I will need to fix the render method so that it updates the html with the elements not already on the page.
//^ FIXED



// Create a function to add the checkmark button.
// add necessary conditionals so that the button gets added once this.read is getting added.
// make sure function takes in the this.read value and is either checked or unchecked. 
// create checkbox button and event listener and then put it in the render row function. 
