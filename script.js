let myLibrary = [];


//constructor for "Book" object
function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

}
// Book.prototype.info = function() {
//     return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
// }

function addBookToLibrary(title, author, page, readStatus){
    const book = new Book(title, author, page, readStatus);
    myLibrary.push(book);
}



function deleteButton(){}

function render(){
    const tableBody = document.querySelector("#books");
    myLibrary.forEach((book, index) =>  {
        console.log(index)
        const tableRow = document.createElement('tr');
        tableRow.setAttribute("data-id", index);
        tableBody.append(tableRow);


        const values = Object.values(book);
        values.forEach(value => {
            const tableCell = document.createElement('td');
            tableCell.textContent = value;
            tableRow.append(tableCell)

        })
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


render();



// Notes
 
// also need to puzzle out the Read (status) column.  Need it to change on click.  So will need an event listener that changes the
// boolean value on click.  and then changes the element in the document.

// may want to create button with a function to clean it up some. (and add the event listener) <- only worry is if it fucks up everything.
// can use the index to add a class to each odd numbered tablerow/cell. this class will change the background color. 

//so now the elements get deleted

// to do the alternating table colors, use something other then delete so that indexs get reset.  then write a function that
// will update the classes to set the background colors.

//lost the og styling inspiration but i found another https://georgius17.github.io/library/

// newest issue: I will need to fix the render method so that it updates the html with the elements not already on the page.
// maybe I can grab the tablebody element and loop trhough each tr data-id, if the id is there then don't update the book?
// could also update the odd and even classes this way as well






// function openForm() {
//     document.getElementById("myForm").style.display = "block";
// }

// function closeForm() {
//     document.getElementById("myForm").style.display = "none";
// }