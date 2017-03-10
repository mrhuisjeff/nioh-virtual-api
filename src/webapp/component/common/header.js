/**
 * Created by Administrator on 2017/3/8.
 */
class Header extends React.Component {

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

module.exports = Header;