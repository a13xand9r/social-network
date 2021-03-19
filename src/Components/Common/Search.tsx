import React, { FC, ChangeEvent } from 'react';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';

type FormPropsType = InjectedFormProps<SearchFormValuesType, {onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void}> & {onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void}

const SearchTextForm: FC<FormPropsType> = (props) => {
    return (
        <form>
            <Field name = 'searchText'
                   component = 'input'
                   placeholder = 'write a name'
                   onChange = {props.onChangeSearch}
                   />
            {/* <button>Search</button> */}
        </form>
    )
}

export type SearchFormValuesType = {
    searchText: string
}

const SearchReduxForm = reduxForm<SearchFormValuesType, {onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void}>({ form: 'search' })(SearchTextForm)

type PropsType = {
    search: (text: string) => void
}

const Search: FC<PropsType> = (props) => {
    // const onSearchButton = (form: SearchFormValuesType) => {
    //     props.search(form.searchText)
    // }
    let timeout: any;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const later = () => {
          clearTimeout(timeout);
          props.search(e.currentTarget.value);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, 1000);
      };
    return(
        <div>
            <SearchReduxForm onChangeSearch = {onChange}/>
        </div>
    )
}

export default Search
