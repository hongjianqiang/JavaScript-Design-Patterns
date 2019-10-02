class EmailPresenter {
    constructor(model, view) {
        this.model = model;
        this.view  = view;
    }

    initialize() {
        const modelData = this.model.getAll();

        this.view.render(modelData);
        this.bindEvents();
    }

    bindEvents() {
        observer.subscribe('view.email-view.add', (email) => {
            this.model.add(email);
        });

        observer.subscribe('view.email-view.remove', (email) => {
            this.model.remove(email);
        });

        observer.subscribe('model.email-address.added', (email) => {
            this.view.addEmail(email);
        });

        observer.subscribe('model.email-address.removed', (email) => {
            this.view.removeEmail(email);
        });
    }
}