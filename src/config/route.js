import React from "react"
import _ from "lodash"
import {Switch, Route, Redirect, useLocation} from "react-router-dom"

const ROUTES = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: ()=> <div>ROOT</div>
  },
  {
    path: "/test",
    key: "TEST",
    exact: true,
    component: ()=> <div>TEST</div>
  },
  {
    path: '/404',
    key: '404',
    component: PageNotFound
  },
  {
    path: '/authorized',
    key: 'AUTHORIZED',
    component: props => {
      if (localStorage.getItem('user')) {
        alert('You need to log in to access app routes');
        return <Redirect to={"/"} />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: '/authorized',
        key: 'AUTHORIZED_ROOT',
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: '/authorized/page',
        key: 'AUTHORIZED_PAGE',
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];
export default ROUTES;

/**
 * @description Render a route with potential sub routes
 * @example https://reacttraining.com/react-router/web/example/route-config
 */
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={
        props =>
        <route.component {...props} routes={route.routes}
      />}
    />
  );
}

function PageNotFound(){
  return <h1>Page Not Found</h1>
}

/**
 * @description 등록된 URL인지 확인한다
 * @param routes
 * @returns {null}
 * @author inae
 * @since 20.12.22
 */
function MatchURLRoutes({routes}){
  let matchedRoute = null
  routes.map(route=> {
    if (!_.isUndefined((route.routes))) {
      route.routes.map(d=>{
        if (_.isEqual(d.path, useLocation().pathname)){
          return matchedRoute = route
        }
      })
    }else{
      if (_.isEqual(route.path, useLocation().pathname)){
        return matchedRoute = route
      }
    }
  })
  return matchedRoute
}

/**
 * @description 라우트에 등록된 컴포넌트를 렌더링한다
 * @param routes
 * @returns {JSX.Element}
 * @since 20.12.21
 * @author inae
 */
export function RenderRoutes({ routes }) {
  let matchedRoute = MatchURLRoutes({routes})
  if(!_.isEmpty(matchedRoute)){
    if(!_.isUndefined((matchedRoute.routes))){
      return (
        <Switch>
          <RouteWithSubRoutes key={matchedRoute.key} {...matchedRoute} />
        </Switch>
      )
    }
    return <Route path={matchedRoute.path} component={matchedRoute.component} />
  }else{
    return <PageNotFound></PageNotFound>
  }
}