import {Button, makeStyles, TextField, Toolbar} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, {useContext, useEffect, useState} from 'react';
import {LanguageContext} from '../../../App';
import {initDate} from '../../../util/functions';
import {INTERFACE_LANGUAGE} from '../../../util/language';
import Handbook from '../../Handbook/Handbook';

const useStyle = makeStyles((theme) => ({
    input: {
        width:'200px',
        '& .MuiFormLabel-root': {
            color: theme.palette.text.primary,
            fontSize: '1.05rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
        },
    }
}))


export function ToolbarBinding({addHandler, filterHandler, accessor, inputType = 'text', label}) {
    const {lang} = useContext(LanguageContext);
    const classes = useStyle()
    const [input, setInput] = useState(initDate())

    useEffect(() => {
        const timer = setTimeout(
            () => filterHandler(accessor, input)
            , 700
        )
        return () => {
            clearTimeout(timer)
        }
    }, [accessor, input])

    return (
        <Toolbar style={{padding: '0', justifyContent: 'space-between'}}>
            <Button
                onClick={addHandler}
                variant="contained"
                color="primary"
                startIcon={<AddIcon/>}
            >
                {INTERFACE_LANGUAGE.add[lang]}
            </Button>
            {accessor && <TextField
                className={classes.input}
                InputLabelProps={{shrink: true}}
                type={inputType}
                value={input}
                label={label}
                onChange={(e) => setInput(e.target.value)}/>}
        </Toolbar>)
}

export default function BindingHandbookInForm({structure, preparedFilter, preparedValue, clickRowHandler}) {
    return (
        <Handbook
            structure={structure}
            preparedFilter={preparedFilter}
            preparedValueForOneElement={preparedValue}
            ToolbarComponent={ToolbarBinding}
            clickRowHandler={clickRowHandler}
            bindingVariant
        />
    )
}