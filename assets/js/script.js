const buildNav = document.querySelector('.builds-nav')
const buildInfo = document.querySelector('.builds-info') 

function reportWindowSize() {
    const buildNavHeight = buildNav.offsetHeight;
    const buildInfoHeight = buildInfo.offsetHeight;
    const calcHeight = buildNavHeight - buildInfoHeight - 10;
    buildInfo.style.top = calcHeight + "px" ;

} reportWindowSize()

window.onresize = reportWindowSize;
const installBuilds =()=> {
    const buildItem = document.querySelectorAll('.build-item path');//нашли все маски домов
    const buildItemAdress = document.querySelector('#adress');//первый айди в документе со значением. 
    const buildItemStages = document.querySelector('#stages');
    const buildItemFlats = document.querySelector('#flats');
    const buildItemSoldFlats = document.querySelector('#sold-flats');
    const buildItemActionFlats = document.querySelector('#action-flats');
    const buildItemReservedFlats = document.querySelector('#reserved-flats');


    buildItem.forEach(item => { //перебрали все path
        let itemFlats = item.getAttribute('data-flats');//взяли все значения дата атрибута
        if( Number(itemFlats) === 0 ) { //проверили на идентичность с нулем (значение и тип данных). предварительно преобразовав строку в число
            item.closest('a').classList.add('sales') ; // ищем от значения data-flats первый закрытый тег а, помня что в переменной выбраны только элементы =0. и дописываем класс .sales
        }
        
        const saleItem = document.querySelectorAll('.sales');
   
        saleItem.forEach((sales, index) =>{
            sales.setAttribute('data-modal', 'modal-' + (index + 1));
        })

        item.addEventListener('mouseover', function () {
            const getItemAdress = item.getAttribute('data-adress');
            const getItemFloors = item.getAttribute('data-floors');
            const getItemFlats = item.getAttribute('data-flats');
            const getItemSoldFlats = item.getAttribute('data-sold-flats');
            const getItemActionFlats = item.getAttribute('data-action-flats');
            const getItemReservedFlats = item.getAttribute('data-reserved-flats');

            buildItemAdress.innerHTML = getItemAdress;
            buildItemStages.innerHTML = getItemFloors;
            buildItemFlats.innerHTML = getItemFlats;
            buildItemSoldFlats.innerHTML = getItemSoldFlats;
            buildItemActionFlats.innerHTML = getItemActionFlats;
            buildItemReservedFlats.innerHTML = getItemReservedFlats;
        })

        item.addEventListener('click', function(event){
           if(item.closest('.sales')){
                event.preventDefault();
           }
        })
    })
}

document.querySelector('.group-builds') ? installBuilds() : null;

function installModal() {
    const callModalBtns = document.querySelectorAll("[data-modal]");
    const customModal = document.querySelectorAll('.custom-modal')
    const closeModal = document.querySelectorAll('.close-modal')

    customModal.forEach((modal, index)=>{
        // modal.setAttribute('id', 'modal-' + (index + 1))
        modal.setAttribute('id', 'modal-sale')
    })

    callModalBtns.forEach((call, index) =>{
        call.addEventListener('click', function(){
            // const callModal = document.querySelector('#modal-' + (index + 1))
            const callModal = document.querySelector('#modal-sale')
            callModal.style.display = "flex";
            callModal.classList.add('show-modal')
        })
    })

    closeModal.forEach(closeBtn => {
        closeBtn.addEventListener('click', onCloseModal)
    })
  
    function onCloseModal() {
        const openModal = document.querySelector('.show-modal')
        openModal.classList.remove('show-modal')
        openModal.style.display = "none";
    } 
}
document.querySelector('.custom-modal') ? installModal() : false;

document.querySelector(".custom-modal#modal-sale").addEventListener("click", (e) => {
    const currentEl = e.target;
    if (currentEl.classList.contains("show-modal")) { 
        currentEl.style.display = "none";
    }
}) 

window.addEventListener('keydown',(e) => {
    // console.log(e.key);
    if (e.key === "Escape") {
    document.querySelector(".custom-modal#modal-sale").style.display = "none";
    }
})
