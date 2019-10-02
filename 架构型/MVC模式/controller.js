class EmailController {
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
            this.addEmail(email);
        });

        observer.subscribe('view.email-view.remove', (email) => {
            this.removeEmail(email);
        });
    }

    addEmail(email) {
        this.model.add(email);
    }

    removeEmail(email) {
        this.model.remove(email);
    }
}
