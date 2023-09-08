import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-f5c1d-default-rtdb.europe-west1.firebasedatabase.app//"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const vocabListInDB = ref(database, "vocabList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const vocabListEl = document.getElementById("vocab-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(vocabListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(vocabListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearVocabListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToVocabListEl(currentItem)
        }    
    } else {
        vocabListEl.innerHTML = "No items here... yet"
    }
})

function clearVocabListEl() {
    vocabListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToVocabListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `vocabList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    vocabListEl.append(newEl)
}