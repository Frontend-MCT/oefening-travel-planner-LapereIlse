// console.log("Welcome there!");

let countryHolder;
const localKey = 'travel-planner';

const init = () =>  {
    console.log('Init (de dom is dus geladen).');
    enableListeners();
};

const enableListeners = () => {
    // #1 Get some buttons
    // querySelectorAll => om alle buttons in 1x te lezen
    const regionButtons = document.querySelectorAll('.js-region-select')
    
    // #2 Listen to the clicks
    for (const button of regionButtons) {
        button.addEventListener('click', function() {
            // #2.1 Look up the data property
            // console.log(this.getAttribute("data-region"));
            const region = this.getAttribute('data-region');

            // #2.2 Get data from the API
            fetchCountries(region);
        })
    }

    countryHolder = document.querySelector('.js-country-holder');

    // Always start with Europe
    fetchCountries('europe');
};

const fetchCountries = region => {
    fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then(result => result.json())
	.then(data => showCountries(data))
	.catch (err => console.error(`An error occured, ${err}`));
};

const showCountries = data => {
    // console.log(data);
    let countries = "";
    // #1 Loop the data
    for (const country of data) {
        // console.log(country.name);

        // #2 Build a HTML-string for each country
        countries += `                
        <article>
            <input id="${country.cioc}-${country.alpha2Code}" class="o-hide c-country-input" type="checkbox">
            <label for="${country.cioc}-${country.alpha2Code}" class="c-country js-country">
                <div class="c-country-header">
                    <h2 class="c-country-header__name">${country.name}</h2>
                    <img class="c-country-header__flag" src="${country.flag}" alt="The flag of ${country.name}.">
                </div>
                <p class="c-country__native-name">${country.nativeName}</p>
            </label>
        </article>
        `;
    }

    countryHolder.innerHTML = countries;
    // HTML is loaded

    // #3 Adjust CSS -> screen.css
    //    - Click on country checked
    //    - Flag connect height
    
    addListenersToCountries('.js-country');

};

const addListenersToCountries = function(classSelector) {
    const countries = document.querySelectorAll(classSelector);

    for (country of countries) {
        country.addEventListener('click', function() {
            console.log('You clicked me ', this);
        });
    }
}

const hasItem = key => { // true/false

}; 

const addItem = key => { // void / true || false?
    localStorage.setItem(key);
};

const removeItem = key => { // void / true || false?
    localStorage.removeItem(key);
};

const countItem = key => { // integer -> 0 ... 250

};

document.addEventListener('DOMContentLoaded', init);