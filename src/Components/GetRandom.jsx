import React, { useState, useEffect } from 'react';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import faker from 'faker';
export default function GetRandom({ rowNum }) {
    const [fakeData, setFakeData] = useState([])
    /* useEffect(() => {
        const genData = () => {
            faker.locale = "en_IND";
            const arrFakeData = Array(100).fill(null).map(() => {
                return {
                    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    avatar: `${faker.internet.avatar()}`,
                    jobTitle: `${faker.name.jobTitle()}`,
                }
            })
            setFakeData(arrFakeData)
            console.log(fakeData)
        }
        genData()
    }, []) */
    function isRowLoaded({ index }) {
        return !!fakeData[index];
    }
    const ITEMS_COUNT = +rowNum
    const ITEM_SIZE = 250
    function loadMoreRows({ startIndex, stopIndex }) {
        return new Promise((resolve) => {
            console.log("Row count", ITEMS_COUNT)
            faker.locale = "en_IND";
            const arrFakeData = Array(ITEMS_COUNT).fill(null).map(() => {
                return {
                    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
                    avatar: `${faker.internet.avatar()}`,
                    jobTitle: `${faker.name.jobTitle()}, ${faker.company.companyName()}`,
                }
            })
            setFakeData(arrFakeData)
            console.log(fakeData)
            resolve(arrFakeData)
        })
    }

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: '1 1 auto', height: '100vh' }}>
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    rowCount={ITEMS_COUNT}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <AutoSizer>

                            {({ height, width }) => {

                                return (
                                    <List
                                        height={height}
                                        rowCount={ITEMS_COUNT}
                                        rowHeight={430}
                                        width={width}
                                        onRowsRendered={onRowsRendered}
                                        ref={registerChild}
                                        rowRenderer={({ key, index, style }) => {
                                            const data = fakeData[index]
                                            const newStyle = style
                                            delete newStyle["width"]
                                            return (
                                                <div key={key} className="Row" style={newStyle}>
                                                    <br />
                                                    <div className="card mx-auto my-3 w-18">
                                                        <img src={data && data.avatar} class="card-img-top" alt="..." />
                                                        <div class="card-body">
                                                            <h5 class="card-title">{data && data.name}</h5>
                                                            <p class="card-text">{data && data.jobTitle}</p>
                                                        </div>
                                                    </div>
                                                    <br />

                                                </div>

                                            )
                                        }}
                                    />
                                )


                            }}
                        </AutoSizer>
                    )}

                </InfiniteLoader>
            </div>
        </div>
    )
}


