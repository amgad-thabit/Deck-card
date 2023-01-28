// 
let deckID
let computerScore = 0
let myScore = 0

const cards = document.getElementById("cards")
const remaining = document.getElementById("remaining")
const computerscore = document.getElementById("computer-score")
const myscore = document.getElementById("my-score")
const header = document.getElementById("header")
const restart = document.getElementById("restart")

function fetchShuffle() {
    fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckID = data.deck_id
            remaining.innerHTML = `Remaining: ${data.remaining}`
            document.getElementById("draw-cards").disabled = false
            document.getElementById('draw-cards').style.color = "snow"
            computerScore = 0
            myScore = 0
            header.innerHTML = `Game of War`
            computerscore.innerHTML = `Computer Score: ${computerScore}`
            myscore.innerHTML = `My Score: ${myScore} `
            if (data.success) {
                cards.innerHTML = ` <h2 class="click-draw">Click The Draw 👇🏼</h2>`

            }
        })
}
document.getElementById("new-deck").addEventListener("click", fetchShuffle)

function newDeckOn() {
    cards.innerHTML = ` <button id="new-deck-on" class="new-deck newbut">New Deck</button>`
    fetchShuffle()

}

function fetchTwoAgain() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            cards.innerHTML = `
            <img class="card-slot" src="${data.cards[0].image}">
            <img class="card-slot" src="${data.cards[1].image}">`
            remaining.innerHTML = `Remaining: ${data.remaining}`

            twoCard(data.cards[0].value, data.cards[1].value)
            if (data.remaining === 0) {
                document.getElementById("draw-cards").disabled = true
                document.getElementById('draw-cards').style.color = "rgb(235, 235, 235)"

            }

        })
}
document.getElementById("draw-cards").addEventListener("click", fetchTwoAgain)


document.getElementById("new-deck-on").addEventListener("click", newDeckOn)

function restartButton() {
    computerScore = 0
    myScore = 0
    header.innerHTML = `You Restart The Game`
    computerscore.innerHTML = `Computer Score: ${computerScore}`
    myscore.innerHTML = `My Score: ${myScore} `
    document.getElementById("draw-cards").disabled = true
    document.getElementById('draw-cards').style.color = "rgb(235, 235, 235)"
    remaining.innerHTML = `Remaining: 0`
    newDeckOn()

}

document.getElementById("restart-button").addEventListener("click", restartButton)

function twoCard(card1, card2) {
    let double = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    let cards1 = double.indexOf(card1)
    let cards2 = double.indexOf(card2)

    if (cards1 > cards2) {
        computerScore++
        header.innerHTML = `Computer Win Card: ${card1} `
        computerscore.innerHTML = `Computer Score: ${computerScore}`
    } else if (cards1 < cards2) {
        myScore++
        header.innerHTML = `My Winner Card: ${card2}`
        myscore.innerHTML = `My Score: ${myScore} `
    } else {
        header.innerHTML = `Draw Card: ${card1} = ${card2}`
    }
}