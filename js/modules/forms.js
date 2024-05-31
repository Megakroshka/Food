function forms() {
    // Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            /* const request = new XMLHttpRequest();
            request.open('POST', 'server.php'); старый метод, используем уже фэтч */

            

            // обычный запрос:
            /* request.setRequestHeader('Content-type', 'multipart/form-data');
            
            const formData = new FormData(form);

            request.send(formData); */

            // JSON:
            /* request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); */
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            /* object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            }); */

            /* request.send(json); */

           /*  fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)
            }) */
            postData('http://localhost:3000/requests', json)
            /* .then(data => data.text()) */ //чтобы ответ приходил в понятной нам форме
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })

// действия после ответа от сервера

            /* request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            }); */
        });
    }

    //Красивое оформление

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}
module.exports = forms;