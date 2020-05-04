import React from 'react';
import { create } from 'react-test-renderer';
import Pagination from './Pagination';

describe("Pagination component test", () => {
        test("button prev appear after click", () => {
                const component = create(<Pagination totalItems = {30} itemsOnPage = {1}
                                                 portionSize = {10}   />)
                const root = component.root;
                let button1 = root.findByType("button")
                button1.props.onClick()
                let button2 = root.findAllByType("button")
                expect(button2.length).toBe(2)
        })
})