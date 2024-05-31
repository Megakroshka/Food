function modal() {
    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal')/* ,
          modalCloseBtn = document.querySelector('[data-close]'); 
          //удалили, так как делаем делегирование событии и обычный обработчик событий уже не будет действовать на другие кнопки*/
    
    function openModal() {
        //без toggle
        modal.classList.add('show');
        modal.classList.remove('hide');
        /* modal.classList.toggle('hide'); */
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    function closeModal() {
        //без toggle
        modal.classList.add('hide');
        modal.classList.remove('show');
        /* modal.classList.toggle('hide'); */
        document.body.style.overflow = '';
    };

    /* modalCloseBtn.addEventListener('click', closeModal)  тоже удаляем из-за дальнейшей кнопки красоты*/;

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" /* && modal.classList.contains('show') */) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;