class EmailModel {
    constructor(data = []) {
        this.emailAddresses = data;
    }
    
    add(email) {
        this.emailAddresses.unshift(email);
        observer.public('model.email-address.added', email);
    }

    remove(email) {
        const index = this.emailAddresses.findIndex(emailAddr => email === emailAddr);
        this.emailAddresses.splice(index, 1);
        observer.public('model.email-address.removed', email);
    }

    getAll() {
        return this.emailAddresses;
    }
}
