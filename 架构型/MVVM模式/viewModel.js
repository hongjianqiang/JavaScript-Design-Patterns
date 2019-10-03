class EmailViewModel {
    constructor(model, view) {
        this.model   = model;
        this.view    = view;
        this.methods = {
            addEmail: (email) => {
                this.model.add(email)
            },
            removeEmail: (email) => {
                this.model.remove(email)
            }
        };
    }

    initialize() {
        this.listElement = this.view.querySelectorAll('[data-loop]')[0];

        this.listItemElement = this.listElement.getElementsByTagName('li')[0];

        this.bindForm();

        this.bindList();

        this.bindEvents();
    }

    bindForm() {
        const form = this.view.querySelectorAll('[data-submit]')[0];
        const fromSubmitMethod = form.getAttribute('data-submit');

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const email = form.getElementsByTagName('input')[0].value;

            if( this.methods[fromSubmitMethod] && typeof(this.methods[fromSubmitMethod]) === 'function') {
                this.methods[fromSubmitMethod](email);
            }
        });
    }

    bindList() {
        const data = this.model.getAll();

        const makeClickFunction = (email) => {
            return (evt) => {
                const methodName = evt.target.getAttribute('data-click');
                if(this.methods[methodName] && typeof(this.methods[methodName]) === 'function') {
                    this.methods[methodName](email);
                }
            }
        }

        this.listElement.innerHTML = '';

        data.map(email => {
            const newListItem = this.listItemElement.cloneNode(true);
            
            newListItem.querySelectorAll('[data-text]')[0].innerHTML = email;
            newListItem.querySelectorAll('[data-click]')[0].addEventListener(
                'click',
                makeClickFunction(email),
                false
            );
            this.listElement.appendChild(newListItem);
        });
    }

    clearInputField() {
        const textField = this.view.querySelectorAll('input[type=text]')[0];
        textField.value = '';
    }

    bindEvents() {
        const updateView = () => {
            this.bindList();
            this.clearInputField();
        }
        observer.subscribe('model.email-address.added', updateView);
        observer.subscribe('model.email-address.removed', updateView);
    }
}