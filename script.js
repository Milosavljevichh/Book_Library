
let inputTitle = document.querySelector('#title');
let inputAuthor = document.querySelector('#author');
let inputPages = document.querySelector('#pages');
let inputIsRead = document.querySelector('#isRead');
let pagesSumDisplay = document.querySelector(".total-pages");
let booksSumDisplay = document.querySelector(".total-books");
let readSumDisplay = document.querySelector(".total-read");

const myLibrary = [];

const form = document.getElementById("form")

const modal = document.getElementById("modal");
function displayForm() {
    modal.showModal()
}

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = read
    this.displayed = false
    this.readDetected = false
};

let pagesSum = 0;
let readSum = 0;

function calculatePages() {
    myLibrary.forEach((book) => {
        if (book.displayed === false) {
            pagesSum += Number(book.pages)
        }   
    })
    
    pagesSumDisplay.innerHTML = pagesSum
};

function calculateRead() {
    let readBooks = []
    myLibrary.forEach((book) => {
        if (book.isRead === true) {
            readBooks.push(book)
        }
    })

    readSum = readBooks.length

    readSumDisplay.innerHTML = readSum;
    console.log(readSum)
}


function addToLibrary() {
    if (((inputTitle.value.length && inputAuthor.value.length >= 2) && (inputPages.value > 0))) {
        myLibrary.push(new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputIsRead.checked))
        resetInput();
        calculatePages();
        calculateRead();
        displayBook();
        booksSumDisplay.innerHTML = Number(myLibrary.length);
        modal.close(); 
}};

function closeDialog() {
    modal.close();
    resetInput();
}

function displayBook() {
myLibrary.forEach((book) => {
    if (book.displayed === false) {
    const booksContainer = document.querySelector('.books-container')

    const card = document.createElement("div")
    card.classList.add("card")

    const title = document.createElement("h3")
    const author = document.createElement("h3")
    const pages = document.createElement("h3")
    const isRead = document.createElement("h3")

    const pTitle = document.createElement("p")
    pTitle.innerHTML = "Title:"
    const pAuthor = document.createElement("p")
    pAuthor.innerHTML = "Author:"
    const pPages = document.createElement("p")
    pPages.innerHTML = "Pages:"
    const pIsRead = document.createElement("p")
    pIsRead.innerHTML = "Is read:"

    title.innerHTML = book.title
    author.innerHTML = book.author
    pages.innerHTML = book.pages
    if (book.isRead === true) {
        isRead.innerHTML = 'Yes'
     } else {
        isRead.innerHTML = 'No'
    }
    book.displayed = true

    
    //adding title section
    const cardSectionTitle = document.createElement("div")
    cardSectionTitle.classList.add("cardSection")
    cardSectionTitle.append(pTitle, title)

    //adding author section
    const cardSectionAuthor = document.createElement("div")
    cardSectionAuthor.classList.add("cardSection")
    cardSectionAuthor.append(pAuthor, author)

    //adding pages section
    const cardSectionPages = document.createElement("div")
    cardSectionPages.classList.add("cardSection")
    cardSectionPages.append(pPages, pages)

    //adding pages section
    const cardSectionRead = document.createElement("div")
    cardSectionRead.classList.add("cardSection")
    cardSectionRead.append(pIsRead, isRead)
    
    //btns
    const cardSectionDelete = document.createElement("div")
    cardSectionDelete.classList.add("cardSectionDelete")

    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height=1.5em fill="white" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>`
    deleteBtn.addEventListener("click", function(){
        pagesSum -= Number(book.pages)
        pagesSumDisplay.innerHTML = pagesSum
        myLibrary.splice(myLibrary.findIndex(obj => {
            return obj.title === book.title
        }), 1)
        booksSumDisplay.innerHTML = Number(myLibrary.length);
        calculateRead();
        card.remove()
    })

    const readBtn = document.createElement("button")
    readBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height=1.5em fill="white" viewBox="0 0 24 24"><title>read</title><path d="M21.59,11.59L23,13L13.5,22.5L8.42,17.41L9.83,16L13.5,19.68L21.59,11.59M4,16V3H6L9,3A4,4 0 0,1 13,7C13,8.54 12.13,9.88 10.85,10.55L14,16H12L9.11,11H6V16H4M6,9H9A2,2 0 0,0 11,7A2,2 0 0,0 9,5H6V9Z" /></svg>`
    readBtn.addEventListener("click", function(){
            book.isRead = !book.isRead
            
            if (book.isRead === true) {
                isRead.innerHTML = 'Yes'
            } else {
                 isRead.innerHTML = 'No'
            }

            calculateRead();
    })

    deleteBtn.classList.add("deleteBtn")
    deleteBtn.classList.add("trashBtn")
    readBtn.classList.add("deleteBtn")
    readBtn.classList.add("readBtn")
    cardSectionDelete.append(readBtn, deleteBtn)
    
    

    //appending card
    const sectionContainer = document.createElement("div");
    sectionContainer.classList.add("sectionContainer")
    sectionContainer.append(cardSectionTitle, cardSectionAuthor, cardSectionPages,cardSectionRead)
    card.append(sectionContainer, cardSectionDelete)
    booksContainer.appendChild(card)
}
})
}


function resetInput() {
    inputTitle.value = " "
    inputAuthor.value = " "
    inputPages.value = ""
    inputIsRead.checked = false
}