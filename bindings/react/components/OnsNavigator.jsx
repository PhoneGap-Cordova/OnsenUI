class OnsNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: []
    };
  }

  update(pages) {
    return new Promise((resolve) => {
      this.setState({pages: pages}, resolve);
    });
  }

  pushPage(comp, options = {}) {
    this.refs.navi._pushPage(options, this.update.bind(this), this.state.pages, comp);
  }

  popPage(options = {}) {
    this.refs.navi._popPage(options, this.update.bind(this), this.state.pages);
  }

  componentWillMount() {
    if (typeof this.props.children !== 'undefined') {
      this.setState({pages: React.Children.toArray(this.props.children)});
    }
  }

  componentDidMount() {
    this.refs.navi.popPage = this.popPage.bind(this);
  }

  render() {
    return (
      <ons-navigator {...this.props} ref="navi">
        {this.state.pages}
      </ons-navigator>
    );
  }
}
