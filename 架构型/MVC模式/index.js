const emailModel = new EmailModel([
    'hongjianqiang@gmail.com',
    '569250030@qq.com',
    'pn15014611087@gmail.com'
]);

const emailFormView = new EmailFormView();

const emailListView = new EmailListView();

const emailView = new EmailView([emailFormView, emailListView]);

const emailController = new EmailController(emailModel, emailView);

emailController.initialize();
