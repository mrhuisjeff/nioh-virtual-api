/**
 * Created by Administrator on 2017/3/8.
 */
import React from 'react';

class List extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <Head />
            <div>
                <div>
                    <Tree />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        </div>);
    }
}

module.exports = List;