import React, {Component, Fragment} from "react";
import {connect} from "react-redux";

import ResultsTable from "../../components/ResultsTable/ResultsTable";
import {fetchAllBlock} from "../../store/actions/blocksActions";
import {fetchResults} from "../../store/actions/resultsActions";
import Paper from "../../components/UI/Paper/Paper";

class Results extends Component {
    componentDidMount() {
        this.props.onFetchResults();
    };

    render() {
        const {classes} = this.props;
        console.log(this.props.results);
        return (
            this.props.results ?
                <Fragment>
                    <Paper>Ваш балл за тестирование: {this.props.overallGrade}</Paper>
                    {this.props.results.map(result => {
                        return <ResultsTable blockId={result.id} blockTitle={result.title} blockSections={result.sections} blockGrade={result.blockGrade}/>
                    })}
                </Fragment> : null
        )
    }
};

const mapStateToProps = state => ({
    blocks: state.blocks.blocks,
    user: state.users.user,
    results: state.results.results,
    overallGrade: state.results.overallGrade,
    isLoading: state.isLoading.isLoading
});

const mapDispatchToProps = dispatch => ({
    onFetchAllBlock: () => dispatch(fetchAllBlock()),
    onFetchResults: () => dispatch(fetchResults())
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
