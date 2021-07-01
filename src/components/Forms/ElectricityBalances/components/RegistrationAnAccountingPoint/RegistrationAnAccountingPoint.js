import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Dialog, makeStyles} from '@material-ui/core';
import {LanguageContext} from '../../../../../App';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import ru from 'date-fns/locale/ru';
import TooltipButton from '../../../../Handbook/TooltipButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
  },
  documentTitle: {
    margin: 20,
  },
  modalWrapper: {
    width: 900,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
  },
  numberDateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numberWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  documentNumberValue: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  dateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  pointsBlockWrapper: {
    display: 'flex',
    flexDirection: 'column',

  },
  pointsBlockWrapperButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
    margin: 20,
  },
  pointsBlockList: {
    padding: '20px 30px',
    minHeight: 300,
  },
  pointsBlockListHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 5fr 4fr 3fr 3fr',
    alignItems: 'center',
    '& input': {
      backgroundColor: 'none',
    },
    '& input:hover': {
      backgroundColor: 'none',
    },
  },
  footer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },


}));


export default function RegistrationAnAccountingPoint({openModal, setOpenOneElement}) {
  console.log('openModal = ', openModal);
  const [open, setOpen] = useState(false);
  const [checkedAll, setCheckedAll] = useState(true);

  useEffect(() => {
    if (!open) {
      setOpen(openModal);
    }
  }, [open, setOpen, openModal]);

  const {lang} = useContext(LanguageContext);
  const classes = useStyle();
  const [documentEdition, setDocumentEdition] = useState({
    id: 123,
    documentNumber: 'РТ000001',
    date: '',
    dateOfEntry: '',
    points: [
      {
        checked: true,
      },
    ],
  });


  const handleDateChange = useCallback(date => {
    console.log('date = ', date);
  }, []);

  const handleAddNewPoint = useCallback(() => {
  }, []);

  return (
      <Dialog className={classes.root} open={open} fullWidth={800}
              maxWidth={800}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
          <Box className={classes.documentTitle}>
            <Typography variant={'h5'}>Регистрация точек учета на головной учет</Typography>
          </Box>
          <Box elevation={3} className={classes.modalWrapper}>
            <Box className={classes.numberDateWrapper}>
              <Box className={classes.numberWrapper}>
                <Typography>Номер:</Typography>
                <Input className={classes.documentNumberValue}
                       value={documentEdition?.documentNumber}
                       disabled={true}/>
              </Box>
              <Box className={classes.dateWrapper}>
                <Typography>Дата:</Typography>
                <KeyboardDateTimePicker
                    id="date-picker-dialog"
                    format="dd.MM.yyyy HH:mm"
                    value={documentEdition?.date || new Date()}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                />
              </Box>
            </Box>
          </Box>
          <Divider/>
          <Box className={classes.pointsBlockWrapper}>
            <Box className={classes.pointsBlockWrapperButtons}>
              <TooltipButton
                  key={'add'}
                  tooltipTitle={'add'}
                  actionHandler={handleAddNewPoint}
                  icon={<AddIcon fontSize='default'/>}
              />
              <TooltipButton
                  key={'delete'}
                  tooltipTitle={'delete'}
                  actionHandler={handleAddNewPoint}
                  icon={<DeleteForeverIcon fontSize='default'/>}
              />
            </Box>
          </Box>
          <Card className={classes.pointsBlockList}>
            <Box className={classes.pointsBlockListHeader}>
              <Checkbox
                  checked={checkedAll}
                  onChange={() => setCheckedAll(!checkedAll)}
                  inputProps={{'aria-label': 'primary checkbox'}}
                  color={'primary'}
                  disableRipple={true}
              />
              <Box>№</Box>
              <Box>Точка учета</Box>
              <Box>Головной учет</Box>
              <Box>Период</Box>
              <Box>Статус</Box>
            </Box>
          </Card>
          <Box className={classes.footer}>
            <Button>ОК</Button>
            <Button>Записать</Button>
            <Button onClick={() => {
              setOpen(false,)
              setOpenOneElement(false);
            }}>Закрыть</Button>
          </Box>
        </MuiPickersUtilsProvider>
      </Dialog>

  );
};

