import React, { lazy, Suspense } from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './index.less';

// TIP：webpackChunkName 是最终懒加载打包出来的文件名称,根据项目情况来
const AsyncHome = lazy(() =>
  import(
    /* webpackChunkName: "mobile/college/wealth/page/home" */ './page/home'
  ),
);
const AsyncCourse = lazy(() =>
  import(
    /* webpackChunkName: "mobile/college/wealth/page/course" */ './page/about'
  ),
);

const renderPage = () => {
  render(
    <Suspense fallback={<div />}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={AsyncHome} />
          <Route exact path="/about" component={AsyncCourse} />
        </Switch>
      </HashRouter>
    </Suspense>,
    document.getElementById('app'),
  );
};

renderPage();
