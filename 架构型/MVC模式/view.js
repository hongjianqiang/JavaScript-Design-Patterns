class EmailFormView {
    constructor() {
        this.form = document.createElement('form');
        this.input = document.createElement('input');
        this.button = document.createElement('button');

        this.input.setAttribute('type', 'text');
        this.input.setAttribute('placeholder', 'New email address');

        this.button.setAttribute('type', 'submit');
        this.button.innerHTML = 'Add';
    }

    render() {
        this.form.appendChild(this.input);
        this.form.appendChild(this.button);

        document.body.appendChild(this.form);

        this.bindEvents();
    }

    bindEvents() {
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            observer.public('view.email-view.add', this.input.value);
        }, false);

        observer.subscribe('model.email-address.added', () => {
            this.clearInputField();
        })
    }

    clearInputField() {
        this.input.value = '';
    }
}

class EmailListView {
    constructor() {
        this.list = document.createElement('ul');
        this.listItem = document.createElement('li');
        this.listItemText = document.createElement('span');
        this.listItemRemoveButton = document.createElement('button');

        this.listItemRemoveButton.innerHTML = 'Remove';
    }

    render(modelData) {
        modelData.map(email => {
            this.list.appendChild(this.createListItem(email))
        });

        document.body.appendChild(this.list);

        this.bindEvents();
    }

    createListItem(email) {
        const listItem = this.listItem.cloneNode(false);
        const listItemText = this.listItemText.cloneNode(false);
        const listItemRemoveButton = this.listItemRemoveButton.cloneNode(true);

        listItem.setAttribute('data-email', email);
        listItemRemoveButton.setAttribute('data-email', email);

        listItemText.innerHTML = email;
        listItem.appendChild(listItemText).appendChild(listItemRemoveButton);

        return listItem;
    }

    bindEvents() {
        this.list.addEventListener('click', (evt) => {
            if(evt.target && evt.target.tagName === 'BUTTON') {
                observer.public('view.email-view.remove', evt.target.getAttribute('data-email'));
            }
        }, false);

        observer.subscribe('model.email-address.added', (email) => {
            this.addEmail(email);
        });

        observer.subscribe('model.email-address.removed', (email) => {
            this.removeEmail(email);
        });
    }

    addEmail(email) {
        this.list.insertBefore(this.createListItem(email), this.list.firstChild);
    }

    removeEmail(email) {
        const listItems = this.list.getElementsByTagName('li');
        const index = [...listItems].findIndex(item => item.getAttribute('data-email') === email);
        this.list.removeChild(listItems[index]);
    }
}

class EmailView {
    constructor(views = []) {
        this.views = views;
    }

    render(modelData) {
        this.views.map(view => {
            view.render(modelData);
        });
    }
}
