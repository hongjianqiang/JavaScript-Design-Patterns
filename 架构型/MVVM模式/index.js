/**
 * MVC，MVP 和 MVVM 的图示
 * http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
 */

const emailModel = new EmailModel([
    'hongjianqiang@gmail.com',
    '569250030@qq.com',
    'pn15014611087@gmail.com'
]);

const emailView = document.body;

const emailViewModel = new EmailViewModel(emailModel, emailView);

emailViewModel.initialize();
