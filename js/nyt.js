/* script.js */
//Here is the API key from Esther's account
const api_key = 'C4W9ZJq24pzftKwkZv3P7JuboVxG1ch0'
//url variable is for connecting to the nyt articles
const url = "https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=" + api_key
//make select a handle to the html id section
const select = document.querySelector('#section')
//url2 variable is for the default content
const url2 = "http://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + api_key
//handle in html where I want the cards
const cardplace = document.querySelector('#cards')
//fetch for when first landing on page
fetch(url2)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        createCard(data)
        // cardplace.append(createCard(data))
    })

// here is the function for section change
select.addEventListener('change', function () {
    const url3 = "http://api.nytimes.com/svc/topstories/v2/" + select.value + ".json?api-key=" + api_key
    console.log()
    console.log("test")
    fetch(url3)
        .then(response => {
            console.log("response:")
            console.log(response)
            return response.json()
            // response.json()
        })
        .then(data => {
            console.log("data: ")
            console.log(data)
            if (data.status == 'OK') {
                console.log("ok")
                createCard(data)
            } else {
                console.log("error in getting")
            }
            // createCard(data)
        })
})

//Refresh button function
const refresh = document.querySelector('#refresh')
refresh.addEventListener('click', () => {
    const url3 = "http://api.nytimes.com/svc/topstories/v2/" + select.value + ".json?api-key=" + api_key
    fetch(url3)
        .then(response => response.json())
        .then(data => {

            if (data.status == 'OK') {
                console.log("ok")
                createCard(data)
            } else {
                console.log("second place to get error in function")
            }
        })
})

function createCard(data) {
    console.log('createCard')
    console.log(data)
    cardplace.innerHTML = ''
    data.results.forEach(story => {
        let div = document.createElement('div')
        console.log(story.title)
        div.classList.add('card')
        div.classList.add('shadow')

        let image = document.createElement('img')
        if (story.multimedia != null) {
            image.setAttribute('src', story.multimedia[0].url)
        }
        // image.setAttribute('src', story.multimedia[0].url)
        image.setAttribute('alt', 'Article related photo')
        image.classList.add('card-img-top')
        div.appendChild(image)

        let innerDiv = document.createElement('div')
        innerDiv.classList.add('card-body')
        div.appendChild(innerDiv)

        let h5 = document.createElement('h5')
        h5.classList.add('card-title')
        h5.innerText = story.title
        innerDiv.appendChild(h5)

        let p = document.createElement('p')
        p.classList.add('card-text')
        p.innerText = story.abstract
        innerDiv.appendChild(p)

        let myDate = story.created_date
        // let formattedDate = new Date(myDate.substring(0, 10))
        let formattedDate
        formattedDate = document.createElement('p')
        formattedDate.classList.add('card-text')
        formattedDate.innerText = new Date(myDate.substring(0, 10))
        // formattedDate = formattedDate.to
        innerDiv.appendChild(formattedDate)

        let link = document.createElement('a')
        link.setAttribute('href', story.url)
        link.classList.add('btn')
        link.classList.add('btn-primary')
        link.innerText = "Read Article"
        innerDiv.appendChild(link)

        console.log(div)

        // return div
        cardplace.append(div)
    })
}