import React, {useEffect, useState} from 'react';
import {handbooks} from '../../util/handbook';
import AsyncInputSelect from './AsyncInputSelect';

export default function HouseSelect({
                                        initHouse,
                                        onHouseChange = () => {
                                        },
                                        onStreetChange = () => {
                                        },
                                    }
) {
    const [city, setCity] = useState(initHouse?.street?.city || {})
    const [street, setStreet] = useState(initHouse?.street || {})
    const [house, setHouse] = useState(initHouse || {})

    useEffect(() => {
        if (street?.city?.id === city.id) return
        setStreet({});
        setHouse({})
    }, [city])

    useEffect(() => {
        if (house?.street?.id === street.id) return
        setHouse({})
        onStreetChange(street)
    }, [street])

    useEffect(() => {
        onHouseChange(house)
    }, [house])

    return <>
        <AsyncInputSelect
            subPath={{structure: () => handbooks.cities, accessor: 'cityname'}}
            value={city}
            label="Город"
            onChange={setCity}
            width='350px'
        />
        <AsyncInputSelect
            subPath={{structure: () => handbooks.streets, accessor: 'streetname'}}
            value={street}
            editing={city.id>=0}
            label="Улица"
            onChange={setStreet}
            width='350px'
            filterParams={{cityid: city.id}}
            externalValue={{city}}
        />
        <AsyncInputSelect
            subPath={{structure: () => handbooks.houses, accessor: 'housenumber'}}
            value={house}
            editing={street.id>=0}
            label="№ дома"
            onChange={setHouse}
            width='350px'
            filterParams={{streetid: street.id}}
            externalValue={{street}}
        />
    </>
}