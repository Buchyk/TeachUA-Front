import {Select} from "antd";
import React, {createRef} from "react";
import {clearSearchParameters, SearchContext, searchParameters} from "../context/SearchContext";
import {getClubsByParameters} from "../service/ClubService";
import {getPossibleResults, getPossibleResultsByText} from "../service/SearchService";
import ControlOutlined from "@ant-design/icons/lib/icons/ControlOutlined";

const {Option, OptGroup} = Select;

class Search extends React.Component {
    static contextType = SearchContext;

    state = {
        searchText: '',
        possibleResults: {
            categories: [],
            clubs: []
        },
        loading: false
    };

    onSearchChange = (value) => {
        let parameter = value.split("#")[0],
            name = value.split("#")[1];

        clearSearchParameters();

        switch (parameter) {
            case "category":
                searchParameters.categoryName = name;
                break;
            case "club":
                searchParameters.clubName = name;
                break;
            default: {
                if(this.state.possibleResults.categories.find(category =>
                        category.name.toLowerCase().includes(name.toLowerCase()))) {
                    searchParameters.categoryName = name;
                }
                else {
                    searchParameters.clubName = name;
                }
            }
        }

        getClubsByParameters(searchParameters).then(response => {
            this.context.setClubs(response);
        });
    };

    onFocus = () => {
        this.setState({loading:true});
        getPossibleResults(searchParameters).then(response => {
            this.setState({possibleResults: response, loading:false})
        });
    };

    onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onSearchChange("all#" + this.state.searchText);
        }
    };

    onSearch = (val) => {
        this.setState({loading:true});
        getPossibleResultsByText(val, searchParameters).then(response => {
            this.setState({possibleResults: response, loading:false})
        });

        this.setState({searchText: val});
    };

    render() {
        return (
            <div className="search">
                <Select
                    showSearch
                    loading={this.state.loading}
                    /*allowClear*/
                    onChange={this.onSearchChange}
                    onSearch={this.onSearch}
                    onFocus={this.onFocus}
                    autoClearSearchValue={false}
                    onInputKeyDown={this.onKeyDown}
                    style={{width: 200}}
                    placeholder="Який гурток шукаєте?"
                    defaultActiveFirstOption={false}>

                    <OptGroup label="Категорії">
                        {
                            this.state.possibleResults.categories.map(result => (
                                <Option value={"category" + "#" + result.name}
                                        key={"category" + "#" + result.id}>
                                    {result.name}
                                </Option>)
                            )
                        }
                    </OptGroup>
                    <OptGroup label="Гуртки">
                        {
                            this.state.possibleResults.clubs.map(result => (
                                <Option value={"club" + "#" + result.name}
                                        key={"club" + "#" + result.id}>
                                    {result.name}
                                </Option>)
                            )
                        }
                    </OptGroup>
                </Select>

                <ControlOutlined className="advanced-icon"/>
            </div>
        );
    }
}

export default Search;