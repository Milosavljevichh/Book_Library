
let inputTitle = document.querySelector('#title');
let inputAuthor = document.querySelector('#author');
let inputPages = document.querySelector('#pages');
let inputIsRead = document.querySelector('#isRead');



const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = read
    this.displayed = false
};

const modal = document.getElementById("modal");
function displayForm() {
    modal.showModal()
}

function addToLibrary() {
    myLibrary.push(new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputIsRead.checked))
    console.log(myLibrary)
    inputTitle.value = " "
    inputAuthor.value = " "
    inputPages.value = ""
    inputIsRead.checked = false
    DB()
    modal.close()
};

function DB() {
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
    
    const cardSectionDelete = document.createElement("div")
    cardSectionDelete.classList.add("cardSection")
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height=1.5em fill="white" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>`
    deleteBtn.addEventListener("click", function(){
        myLibrary.splice(myLibrary.findIndex(obj => {
            return obj.title === book.title
        }), 1)
        card.remove()
    })
    deleteBtn.classList.add("deleteBtn")
    cardSectionDelete.append(deleteBtn)
    
    

    //appending card
    card.append(cardSectionTitle, cardSectionAuthor, cardSectionPages, cardSectionRead, cardSectionDelete)
    booksContainer.appendChild(card)
}
})
}
