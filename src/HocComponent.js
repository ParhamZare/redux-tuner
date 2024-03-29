import React from 'react';
import DB from './db'
import Helper from './Helper';
import Config from './Config'

const TransformComponent = (importComponent) => {
    return class extends React.Component {
        state = {
            isFinishedTransform: false,
            Component: importComponent,
            props: {}
        }

        async transformData(props) {
            let countOfItemes = Object
                .keys(props)
                .length;
            let index = 0;
            let finalObject = Object.assign({}, this.props);
            let keysOfProps = Object.keys(props);
            keysOfProps.map(async (key, index) => {
                let result = {}
                switch (typeof props[key]) {
                    case "object":
                        result = await Helper.getTransformedData(props[key]);
                        finalObject[key] = result;
                        break;
                    case "string":
                        if (props[key].includes(">>")) {
                            let value = props[key].split(">>")
                            result = await (Helper.getDataWithKeyFromDB(value[0]));
                            finalObject[key] = result.data;
                        }
                        break;
                }
                if (index === (keysOfProps.length - 1)) {
                    this.setState({ isFinishedTransform: true, props: finalObject })
                }
            });
        }

        componentDidMount() {
            this.transformData(this.props);
        }

        componentWillReceiveProps(nextProps) {
            setTimeout(() => {
                this.transformData(nextProps);
            }, 100)
        }

        render() {
            const { isFinishedTransform, Component, props } = this.state;
            return Component && isFinishedTransform
                ? <Component {...props} />
                : null;
        }
    }
};

export default TransformComponent;