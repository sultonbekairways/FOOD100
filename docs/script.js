const product = {
    plainBurger: {
        name: 'gamburger simple',
        price: 10000,
        kcall: 400,
        img: 'images/product2.jpg',
        descr: 'Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый',
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'freshburger',
        price: 20500,
        kcall: 500,
        img: 'images/product1.jpg',
        descr: 'Встречайте Фрешмена FAST FOOD`а. Он набрал в себя всё самое старое.',
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'freshcombo',
        price: 31900,
        kcall: 700,
        img: 'images/product3.jpg',
        descr: 'FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.',
        amount: 0,
        get Summ() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
}

// create additional production

const extraProduct = {
    doubleMayonnaise: {
        name: 'duble mayonnaise',
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: 'lettuce',
        price: 300,
        kcall: 10
    },
    cheese: {
        name: 'cheese',
        price: 400,
        kcall: 300
    }
}

let str = '';

function createBurger() {
    const main = document.querySelector('.main');

    for (const key in product) {
        const { name, img, price, descr } = product[key];
        str += `<section class="main__product" id="${key}">
        <div class="main__product-preview">
            <div class="main__product-info">
                <img src="${img}" alt="" class="main__product-img">
                <div class="full-screen-box">
                    <img src="${img}" alt="" class="full-screen-img">
                </div>
                <h2 class="main__product-title">${name}
                    <span class="main__product-many">${price} сум</span>
                </h2>
            </div>
            <p class="main__product-descr">
            ${descr}
            </p>
        </div>
        <div class="main__product-extra">
            <div class="main__product-number">

                <a class="main__product-btn fa-reg minus" data-symbol="-"></a>
                <output class="main__product-num">0</output>
                <a class="main__product-btn fa-reg plus" data-symbol="+"></a>

            </div>
            <div class="main__product-price"><span>0</span> сум</div>
        </div>
        <div class="main__product-extraProduct">`;
        for (const newKey in extraProduct) {
            str += `<label class="main__product-label">  
            <input type="checkbox" class="main__product-checkbox" data-extra="${newKey}">
            <span class="main__product-check"></span>
            ${extraProduct[newKey].name}
            </label>`;
        }
        str += `</div>
        <div class="main__product-call"><span>0</span> калорий</div>
        </section>`;
    }
    main.innerHTML = str;
    Market();
}
setTimeout(() => createBurger(), 1000);
function Market() {
    const btnPlusOrMinus = document.querySelectorAll('.main__product-btn')
        , checkExtraProduct = document.querySelectorAll('.main__product-checkbox')
        , addCart = document.querySelector('.addCart')
        , receipt = document.querySelector('.receipt')
        , receiptOut = document.querySelector('.receipt__window-out')
        , receiptWindow = document.querySelector('.receipt__window')
        , receiptBtn = document.querySelector('.receipt__window-btn');

    // pereberayem vse knopki (+ i -)

    for (let i = 0; i < btnPlusOrMinus.length; i++) {
        btnPlusOrMinus[i].addEventListener('click', function () {
            plusOrMinus(this);
        })
    }
    // функция обработки кнопки + или -
    function plusOrMinus(element) {
        // closest - подключается к ближайшему заданному родителю
        // getAttribute() - берет аттрибут у элемента 
        let parentId = element.closest('.main__product').getAttribute('id')
            , out = element.closest('.main__product').querySelector('.main__product-num')
            , price = element.closest('.main__product').querySelector('.main__product-price span')
            , kcall = element.closest('.main__product').querySelector('.main__product-call span');

        if (element.getAttribute('data-symbol') == '+' && product[parentId].amount < 5) {
            product[parentId].amount++;
        } else if (element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
            product[parentId].amount--;
        }
        out.innerHTML = product[parentId].amount;
        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Kcall;
    }

    for (let i = 0; i < checkExtraProduct.length; i++) {
        checkExtraProduct[i].addEventListener('click', function () {
            addExtraProduct(this);
        })
    }

    function addExtraProduct(el) {
        const parent = el.closest('.main__product')
            , parentId = parent.getAttribute('id');

        product[parentId][el.getAttribute('data-extra')] = el.checked;

        const kcall = parent.querySelector('.main__product-call span')
            , price = parent.querySelector('.main__product-price span')
            , elDataInfo = el.getAttribute('data-extra');

        if (product[parentId][elDataInfo] == true) {
            product[parentId].kcall += extraProduct[elDataInfo].kcall;
            product[parentId].price += extraProduct[elDataInfo].price;
        } else {
            product[parentId].kcall -= extraProduct[elDataInfo].kcall;
            product[parentId].price -= extraProduct[elDataInfo].price;
        }
        kcall.innerHTML = product[parentId].Kcall;
        price.innerHTML = product[parentId].Summ;
    }

    let arrProduct = []
        , totalName = ''
        , totalPrice = 0
        , totalKcall = 0;

    addCart.addEventListener('click', function () {
        for (const key in product) {
            const productObj = product[key];
            if (productObj.amount > 0) {
                arrProduct.push(productObj);
                for (const newKey in productObj) {
                    if (productObj[newKey] === true) {
                        productObj.name += '\n' + extraProduct[newKey].name;
                    }
                }
            }
            productObj.price = productObj.Summ;
            productObj.kcall = productObj.Kcall;
        }
        for (let i = 0; i < arrProduct.length; i++) {
            const el = arrProduct[i];
            totalPrice += el.price;
            totalKcall += el.kcall;
            totalName += '\n' + el.name + '\n';
        }
        receiptOut.innerHTML = `Вы купили: \n ${totalName} \nКолорийность: ${totalKcall} \nСтоимость покупки: ${totalPrice} сумм`;
        // checklist animation 
        receipt.style.display = 'flex';
        setTimeout(function () {
            receipt.style.opacity = '1';
        }, 100);
        setTimeout(function () {
            receiptWindow.style.top = '0';
        }, 200);
        document.body.style.overflow = 'hidden';
        //purchased products innerHtml cleared
        const outNum = document.querySelectorAll('.main__product-num')
            , outPrice = document.querySelectorAll('.main__product-price span');

        for (let i = 0; i < outNum.length; i++) {
            outNum[i].innerHTML = 0;
            outPrice[i].innerHTML = 0;
        }
    })

    receiptBtn.addEventListener('click', function () {
        location.reload();
    })

    // 100 lvl animation

    const logoAnimation = document.querySelector('.header__timer-extra')
        , changer = document.querySelectorAll('.header__timer');

    let i = 0;
    function timer() {
        if (i <= 100) {
            logoAnimation.innerHTML = i++;
            if (i % 2 == 0) {
                changer[0].classList.add('color2');
                changer[0].classList.remove('color1');
            }
            else {
                changer[0].classList.add('color1');
                changer[0].classList.remove('color2');
            }

            setTimeout(() => timer(), 200);
        } else {
            logoAnimation.innerHTML = 100;
            changer[0].classList.remove('color1');
            changer[0].classList.remove('color2');
        }
    }
    timer();

    //выплывает бургер при нажатии на рисунок
    let bugerImgClick = document.querySelectorAll('.main__product-title')
        , fullScreenBoxRemove = document.querySelectorAll('.full-screen-box')
        , closeImg = '';

    for (let i = 0; i < bugerImgClick.length; i++) {
        bugerImgClick[i].addEventListener('click', function () {
            addbigImg(this);
        })
    }

    function addbigImg(obj) {
        closeImg = obj.closest('.main__product').querySelector('.full-screen-box')
        closeImg.style = 'opacity:1; z-index:1;'
        document.body.style.overflow = 'hidden';
    }

    for (let i = 0; i < fullScreenBoxRemove.length; i++) {
        fullScreenBoxRemove[i].addEventListener('click', function () {
            removebigImg(this);
        })
    }

    function removebigImg(obj) {
        closeImg = obj.closest('.main__product').querySelector('.full-screen-box')
        closeImg.style = 'opacity:0; z-index:-1;'
        document.body.style.overflow = 'visible';
    }

}

