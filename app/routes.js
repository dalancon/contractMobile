// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import auth from 'apis/auth';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

function redirectToLogin(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/index',
      name: 'layout',
      onEnter: redirectToLogin,
      getComponent(nextState, cb) {

        const importModules = Promise.all([
          import('containers/Layout/reducer'),
          import('containers/Layout/sagas'),
          import('containers/Layout'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('layout', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [{
        path: '/contract',
        name: 'viewContract',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/Contract/ViewContract/reducer'),
            import('containers/Contract/ViewContract/sagas'),
            import('containers/Contract/ViewContract'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('viewContract', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }, {
        path: '/contract/details',
        name: 'contractDetails',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/Contract/ContractDetails/reducer'),
            import('containers/Contract/ContractDetails/sagas'),
            import('containers/Contract/ContractDetails'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('contractDetails', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }, {
        path: '/contract/payment/apply',
        name: 'applyPayment',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/Payment/ApplyPayment/reducer'),
            import('containers/Payment/ApplyPayment/sagas'),
            import('containers/Payment/ApplyPayment'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('applyPayment', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }, {
        path: '/payment2/fillPayment',
        name: 'editPayment',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/Payment/EditPayment/reducer'),
            import('containers/Payment/EditPayment/sagas'),
            import('containers/Payment/EditPayment'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('editPayment', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }, {
        path: '/payment2/paymentDetails',
        name: 'paymentDetails',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/Payment/PaymentDetails/reducer'),
            import('containers/Payment/PaymentDetails/sagas'),
            import('containers/Payment/PaymentDetails'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('paymentDetails', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }, {
        path: '/payment2/printPayment',
        name: 'printPayment',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/Payment/PrintPayment/reducer'),
            import('containers/Payment/PrintPayment/sagas'),
            import('containers/Payment/PrintPayment'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('printPayment', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }, {
        path: '/payment2/examinePayment',
        name: 'examinePayment',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/Payment/ExaminePayment/reducer'),
            import('containers/Payment/ExaminePayment/sagas'),
            import('containers/Payment/ExaminePayment'),
          ]);

          const renderRoute = loadModule(cb);

          importModules.then(([reducer, sagas, component]) => {
            injectReducer('examinePayment', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }, {
        path: '/task/:taskType',
        name: 'taskManage',
        getComponent(nextState, cb) {
          const importModules = Promise.all([
            import('containers/TaskManage/reducer'),
            import('containers/TaskManage/TaskTable/reducer'),
            import('containers/TaskManage/sagas'),
            import('containers/TaskManage'),
          ]);

          const renderRoute = loadModule(cb);
          importModules.then(([reducer, taskTableReducer, sagas, component]) => {
            injectReducer('taskManage', reducer.default);
            injectReducer('taskTable', taskTableReducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
          });

          importModules.catch(errorLoading);
        },
      }],
    }, {
      path: '/login',
      name: 'loginPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage/sagas'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('loginPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
