import React, {useState, useEffect} from 'react';
import * as api from '../api/api'

export default function TEST({handbookName, preparedValue}) {
    const [newRow, setNewRow] = useState()
    api.addElementHandbook(handbookName,row)
}

