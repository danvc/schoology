import React from 'react';
import { render, queryByAttribute } from '@testing-library/react';
import App from '../App';

test('Simple test to make sure that the searchbar is available', () => {
    const dom = render(<App />);
    const getById = queryByAttribute.bind(null, 'id');
    const searchBar = getById(dom.container, 'search-course-field');
    expect(searchBar).toBeInTheDocument();
});
