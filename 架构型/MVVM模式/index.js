const emailModel = new EmailModel([
    'hongjianqiang@gmail.com',
    '569250030@qq.com',
    'pn15014611087@gmail.com'
]);

const emailView = document.body;

const emailViewModel = new EmailViewModel(emailModel, emailView);

emailViewModel.initialize();
