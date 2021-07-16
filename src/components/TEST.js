import React from 'react';
import HouseSelect from './Inputs/HouseSelect';

export default function f() {
    return <HouseSelect initHouse={
        {
            'id': 5,
            'buildingtype': {'id': 1, 'buildingtypename': 'BTN1 '},
            'street': {
                'id': 1,
                'streetname': 'string',
                'created': '2021-06-24',
                'closed': null,
                'city': {'id': 0, 'cityname': 'Vjcrdf'}
            },
            'housenumber': '1111111',
            'buildingnumber': 'string',
            'rp': {
                'id': 1,
                'rpname': 'rp1',
                'invnumber': '',
                'inputvoltage': {'id': 0, 'voltagename': '', 'voltagevalue': 0},
                'outputvoltage1': {'id': 0, 'voltagename': '', 'voltagevalue': 0},
                'outputvoltage2': {'id': 0, 'voltagename': '', 'voltagevalue': 0},
                'tp': {'id': 0, 'tpname': '', 'grp': {'id': 0, 'grpname': ''}}
            },
            'area': {'id': 1, 'areanumber': '111', 'areaname': 'a1'},
            'ksk': {'id': 1, 'kskname': 'ksk1', 'kskaddress': '', 'kskhead': '', 'kskphone': ''},
            'sector': {'id': 1, 'sectorname': 'sn1'},
            'connector': {'id': 1, 'connectorname': 'CONN1 '},
            'inputtype': {'id': 1, 'inputtypename': 'it1ы'},
            'reliability': {'id': 1, 'reliabilityname': 'rn1'},
            'voltage': {'id': 1, 'voltagename': 'v1', 'voltagevalue': 1}
        }
    }/>
}