class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            deleteInProgress: false,
            items: []
        };
    }

    fetchListData() {
        const _this = this;
        // Fetch asset-list data
        fetch(apiUrl + "getAllAssets")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        deleteInProgress: false,
                        isLoaded: true,
                        items: result.value
                    });
                },
                (error) => {
                    _this.setState({
                        deleteInProgress: false,
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    createClicked() {
        this.props.history.push("/detail/create");
    }

    editClicked(assetKey) {
        this.props.history.push("/detail/" + assetKey);
    }

    historyClicked(assetKey) {
        this.props.history.push("/history/" + assetKey);
    }

    deleteClicked(assetKey) {
        const _this = this;
        // delete in progress
        this.state.deleteInProgress = true;
        this.setState(this.state);
        // delete asset
        fetch(apiUrl + "delAsset/" + assetKey)
            .then(res => res.json())
            .then(
                (result) => {
                    // delete finished
                    _this.fetchListData();
                }
            );
    }

    componentDidMount() {
        this.fetchListData();
    }

    render() {
        const { error, isLoaded, deleteInProgress, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className={`asset-list ${deleteInProgress ? "asset-list-no-overflow" : ""}`}>
                    <h2>List of assets</h2>
                    <table class="table list-table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Key</th>
                                <th scope="col">Description</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Price</th>
                                <th scope="col" class="list-table-edit-col">
                                    <button type="button" class="btn btn-success list-button" onClick={this.createClicked.bind(this)}>Create asset</button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.Key}>
                                    <th scope="row">{item.Key}</th>
                                    <td>{item.Record.desc}</td>
                                    <td>{item.Record.amount}</td>
                                    <td>{item.Record.price}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary list-button" onClick={this.editClicked.bind(this, item.Key)}>Edit</button>
                                        <button type="button" class="btn btn-secondary list-button" onClick={this.historyClicked.bind(this, item.Key)}>History</button>
                                        <button type="button" class="btn btn-danger list-button" onClick={this.deleteClicked.bind(this, item.Key)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={`list-table-disabled ${!deleteInProgress ? "hide-element" : ""}`}>
                        <div class="delete-spinner">
                            <div class="loader delete-loader">Loading...</div>
                        </div>
                    </div>
                </div >
            );
        }
    }
}