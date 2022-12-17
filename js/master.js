const toggleIcon = document.getElementById('toggle-icon');
const linksBox = document.getElementById('links-box');
const settingBox = document.getElementById('setting-box');
const settingButton = document.getElementById('setting-button');
const settingIcon = document.getElementById('setting-icon');

//toggle active when click on the button
const toggleActive = (button, ...items) => {
    button.addEventListener('click', () => {
        items.forEach(item => {
            item.classList.toggle('active');
        });
    });
}

//toggle active when click outside but not on the button or the box itself
const ids = ['links-box', 'toggle-icon', 'setting-box', 'setting-button', 'setting-icon'];
document.onclick = function (e) {
    if (!ids.includes(e.target.id)) {
        if (linksBox.classList.contains('active')) {
            linksBox.classList.remove('active');
        }
        if (settingBox.classList.contains('active')) {
            settingBox.classList.remove('active');
            settingIcon.classList.remove('active');
        }
    }
}

toggleActive(toggleIcon, linksBox);
toggleActive(settingButton, settingBox, settingIcon);


//change colors
const colorsList = document.querySelectorAll('.option-box .colors-list li');

//clear Active
const clearActive = list => {
    list.forEach(li => {
        li.classList.remove('active');
    })
};

//set option in local storage and apply it
colorsList.forEach(item => {
    item.addEventListener('click', (ele) => {
        clearActive(ele.target.parentElement.querySelectorAll('li'));
        ele.target.classList.add('active');
        document.documentElement.style.setProperty('--primary-color', ele.target.dataset.color);
        localStorage.setItem('favorite_color', ele.target.dataset.color);
    });
});

//search in local storage for the favorite color and add active
if (localStorage.getItem('favorite_color') !== null) {
    document.documentElement.style.setProperty('--primary-color', localStorage.getItem('favorite_color'));
    clearActive(colorsList);
    colorsList.forEach(item => {
        if (localStorage.getItem('favorite_color') === item.dataset.color) {
            item.classList.add('active');
        }
    });
}


//random background image
const landingPage = document.querySelector('.landing-page');
const backgroundSwitchers = document.querySelectorAll('.random-background button');

//randomize is a variable to be able to clear setInterval
let randomize;
//randomize function
const switcher = function () {
    randomize = setInterval(() => {
        const imgs = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg'];
        let randomNum = Math.floor(Math.random() * imgs.length);
        landingPage.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(\'../images/${imgs[randomNum]}\')`;
    }, 10000);   
};

//random background, set active and save in local storage
backgroundSwitchers.forEach(bgSwitch => {
    bgSwitch.addEventListener('click', (e) => {
        clearActive(backgroundSwitchers);
        e.target.classList.add('active');
        if (e.target.dataset.background === 'no') {
            clearInterval(randomize);
            localStorage.setItem('random_background', 'no');
        } else {
            switcher();
            localStorage.setItem('random_background', 'yes');
        }
    });
});

switcher();

//set active if the dataset equal the local storage (background and bullets)
const setActive = (list, dataName, storageName) => {
    list.forEach(item => {
        if (item.dataset[dataName] === localStorage.getItem(storageName)) {
            item.classList.add('active');
        }
    });
};

//search in local storage for the random background and add active
if (localStorage.getItem('random_background') !== null) {
    clearActive(backgroundSwitchers);
    setActive(backgroundSwitchers, 'background', 'random_background');
    if (localStorage.getItem('random_background') === 'yes') {
        switcher();
    } else {
        clearInterval(randomize);
    }
}

//progress animation when scroll on
const skillSection = document.querySelector('section.skills');
const progressLine = document.querySelectorAll('.skills-content .skill-progress span');

window.addEventListener('scroll', function() {
    let sectionHeight = skillSection.offsetHeight;
    let sectionTopHeight = skillSection.offsetTop;

    if (this.pageYOffset > sectionHeight + sectionTopHeight - this.innerHeight) {
        progressLine.forEach(line => {
            line.style.width = line.dataset.progress;
        });
    }
});


//create a popup overlay to show the big  size of image
const gallery = document.querySelectorAll('.gallery .imgs-container img');

//check the screen width
if (window.innerWidth > 576) {
    //create popup
    let popup = document.createElement('div');
    let popupContainer = document.createElement('div');
    let popupImg = document.createElement('img');
    let h3 = document.createElement('h3');
    let span = document.createElement('span');

    //include them into the popup div 
    popup.appendChild(popupContainer);
    popupContainer.appendChild(h3);
    popupContainer.appendChild(popupImg);
    popupContainer.appendChild(span);
    span.textContent = 'X';
    
    //give them classes
    popup.classList = 'popup';
    popupImg.className = 'popupImg';

    gallery.forEach(img => {
        img.addEventListener('click', () => {
            //give popup img the src attribute value
            popupImg.src = img.src;
            h3.innerHTML = img.alt;

            //insert popup to DOM
            document.body.append(popup);
        });
    });

    //close popup
    span.addEventListener('click', () => {
        popup.remove();
    });
}


//create bullets aside
const allSectionClasses = ['about-us', 'skills', 'gallery', 'timeline', 'features', 'testimonials'];
let aside = document.createElement('aside');

allSectionClasses.forEach(sectionClass => {
    let bulletDiv = document.createElement('div');
    let detailSpan = document.createElement('span');

    //giving them classes
    aside.classList = 'bulletsContainer';
    bulletDiv.className = 'bullet';

    //appending them
    detailSpan.textContent = document.querySelector(`.${sectionClass}`).dataset.detail;
    bulletDiv.appendChild(detailSpan);
    aside.append(bulletDiv);
    document.body.append(aside);

    //move to with bullets
    bulletDiv.addEventListener('click', () => {
        scroll({
            top: document.querySelector(`.${sectionClass}`).offsetTop,
            behavior: 'smooth',
        });
    });
});


//show bullets, set active and save in local storage
const bulletsSwitchers = document.querySelectorAll('.show-bullets button');
const bulletsContainer = document.querySelector('.bulletsContainer');

bulletsSwitchers.forEach(bgSwitch => {
    bgSwitch.addEventListener('click', (e) => {
        clearActive(bulletsSwitchers);
        e.target.classList.add('active');
        if (e.target.dataset.bullets === 'no') {
            localStorage.setItem('show_bullets', 'no');
            bulletsContainer.style.display = 'none';
        } else {
            bulletsContainer.style.display = 'block';
            localStorage.setItem('show_bullets', 'yes');
        }
    });
});

//search in local storage for show bullets and add active
if (localStorage.getItem('show_bullets') !== null) {
    clearActive(bulletsSwitchers);
    setActive(bulletsSwitchers, 'bullets', 'show_bullets');
    if (localStorage.getItem('show_bullets') === 'yes') {
        bulletsContainer.style.display = 'block';
    } else {
        bulletsContainer.style.display = 'none';
    }
}


//move to with menu
const links = document.querySelectorAll('.links li a');

links.forEach(link => {
    link.onclick = function(e) {
        e.preventDefault();
        scroll({
            top: document.querySelector(`.${e.target.dataset.section}`).offsetTop,
            behavior: 'smooth',
        });
    }
});


//reset options
const resetButton = document.querySelector('.reset');

resetButton.onclick = function () {
    localStorage.clear();

    //this is not the best way(btw)
    window.location.reload();
}


