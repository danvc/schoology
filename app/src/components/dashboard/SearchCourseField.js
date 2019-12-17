import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import lodash from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';


export default class SearchCourseField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        };
        this.onChange = this.onChange.bind(this);
        this.fetchData = lodash.debounce(this.fetchData.bind(this), 400);
    }

    async fetchData(query) {
        let self = this;
        await axios.get('/api/v1/courses/search?q=' + query).then((response) => {
            self.setState({ data: response.data.map((e) => {return  { name: e.attributes.name }}), loading: false})
        })

    }
    
    onChange(e) {
        if (e.target.value && e.target.value.trim().length > 0)  {
            this.setState({loading: true});
            this.fetchData(e.target.value);
        }
    }

    render() {
        return (
            <Autocomplete
                id="combo-box-demo"
                options={this.state.data}
                getOptionLabel={option => { console.log(option); return option.name}}
                style={{ width: 300 }}
                loading={this.state.loading}
                renderInput={params => (
                    <TextField
                        {...params} 
                        id="outlined-basic"
                        className={this.props.className}
                        margin="none"
                        placeholder={`What courses are you looking for?`}
                        variant="outlined"
                        fullWidth
                        onChange={this.onChange}
                        InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                
                        />
                )}
            />
        );
    }
}
