# redux-tunner

Improve speed and add offline support for React&Redux Application

![architecture text](https://github.com/ParhamZare/redux-tunner/blob/master/architecture.png)

#Usage

First:

```javascript

import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducer';
import {logger} from 'redux-logger'
import {customStore, runService} from "redux-tunner";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(customStore(rootReducer));

runService(store)

export default store


```

Second

```javascript

import React from 'react';
import {connect} from 'react-redux';
import {TransformComponent} from "redux-tunner";

export const Component = (props) => {
    return (
        <div>
          <h1>redux tunner</h1>
        </div>
    )
};

function mapStateToProps(state) {
    return {};
}

function dispatchToProps(dispatch) {
    return {
      
    }
}

export default connect(mapStateToProps, dispatchToProps)(TransformComponent(Component))

```
