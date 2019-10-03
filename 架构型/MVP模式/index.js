/**
 * MVC，MVP 和 MVVM 的图示
 * http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
 */

const emailModel = new EmailModel([
    'hongjianqiang@gmail.com',
    '569250030@qq.com',
    'pn15014611087@gmail.com'
]);

const emailFormView = new EmailFormView();

const emailListView = new EmailListView();

const emailView = new EmailView([emailFormView, emailListView]);

const emailPresenter = new EmailPresenter(emailModel, emailView);

emailPresenter.initialize();
