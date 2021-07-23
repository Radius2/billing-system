import React, {useCallback, useContext, useEffect, useState} from 'react';
import {getHandbookHistory} from '../../../api/api';
import {
    Box,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    makeStyles
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {LanguageContext} from '../../../App';
import * as historyHandbook from '../../../structure/aditionalStructure/historyHandook'
import InputField from '../../Inputs/InputField';

const useStyle = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    accordion: {},
    headerAccordion: {
        '& > .Mui-expanded': {
            marginTop: '12px',
            marginBottom: 0
        }
    },
    bodyAccordion: {
        padding: '0 ' + theme.spacing(1) + 'px',
    }
}))

export default function HistoryElement({handbookName, id}) {
    const classes = useStyle()
    const {lang} = useContext(LanguageContext);
    const [historyData, setHistoryData] = useState([])
    const [loading, setLoading] = useState(true)
    const [columns] = useState(historyHandbook[handbookName].columns)

    useEffect(() => {
        if (!handbookName || !id) return undefined
        setLoading(true)
        getHandbookHistory(handbookName, id)
            .then(({data}) => setHistoryData(data))
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false))
    }, [handbookName, id])

    const inputField = useCallback((column, row) => (
        <React.Fragment key={column.accessor}>
            <InputField
                editing={false}
                type={column.type}
                value={row[column.accessor]}
                label={column.header[lang]}
                width={column.width}
                options={column.options}
            />
            {column.break ? <Divider/> : null}
        </React.Fragment>
    ), [])

    return (
        <>
            {!loading ? historyData.map((row, index) => (
                    <Accordion className={classes.accordion} key={index}>
                        <AccordionSummary
                            className={classes.headerAccordion}
                            expandIcon={<ExpandMoreIcon/>}>
                            {columns.map(column => column.mainValue ? inputField(column, row) : null)}
                        </AccordionSummary>
                        <AccordionDetails
                            className={classes.bodyAccordion}
                        >
                            <Box style={{width: '100%'}}>
                                {columns.map(column => !column.mainValue ? inputField(column, row) : null)}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))
                : null}
        </>
    )
}