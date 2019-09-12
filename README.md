# redux-tuning

![architecture text](https://github.com/ParhamZare/redux-tuner/raw/master/architecture.png)

Improve speed and provide faster rehydrate data, support for React&Redux Application with two-step

I think "Redux" is the best thing for javascript application It helps you write applications that behave consistently, run in different environments like ("Server" , " Mobile app", " WebApp").
when we dispatch some action in "Redux". "Redux" saves your application state and you can access your state with one container called "React-redux".

But I had one issue on mobile application and huge web application
when data is a huge and your app start to slow because all state stored in "Ram" .
 I started to write one module as "Redux-tuner" module. when I dispatch one action I wrote one middleware to store data in the disk and generate one key and change data to key in redux. when I need access data I transform data from key to data and use in React component or in middleware and I wrote on service to rehydrate redux state to enable offline mode for the application.

![architecture text](https://github.com/ParhamZare/redux-tunner/blob/master/Flow.svg)

Online example
https://codesandbox.io/s/github/ParhamZare/pepper

**Usage**

How Install Package:

```
npm i redux-tuner
```

First:

```javascript

import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducer';
import {customStore, runService} from "redux-tunner";

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
