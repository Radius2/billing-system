import React from 'react';
import {Box} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import OfflineBoltRoundedIcon from '@material-ui/icons/OfflineBoltRounded';
import NoteAddRoundedIcon from '@material-ui/icons/NoteAddRounded';
import QueuePlayNextRoundedIcon from '@material-ui/icons/QueuePlayNextRounded';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {NavLink} from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import PieChartRoundedIcon from '@material-ui/icons/PieChartRounded';
import {ELECTRICITY_BALANCES_PATH, REGISTRATION, SERTIFICATION} from './util/electricityBalancesForms';


const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: 30,
    display: 'grid',
    gap: 20,

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  blockHeader: {
    color: '#151515',
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  mainBlockItemsWrapper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(3),

    display: 'grid',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '100px 100px',
      gridTemplateRows: '50px 50px',
    },

    [theme.breakpoints.down('xl')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '120px 120px',
      gap: theme.spacing(5),
    },


  },
  mainBlockItem: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 60px',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#c8d5f5',
    },
    transition: 'background 0.2s ease-in',

  },

  mainBlockItemTitle: {
    [theme.breakpoints.down('xl')]: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#151515',
      padding: theme.spacing(3),
    },
  },
  additionalBlockItemsWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    margin: 0,
  },
  additionalBlockTitles: {
    fontWeight: 'bold',
    textAlign:'left',
    fontSize: 18,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    color: '#404040',
  },
  additionalBlockItemWrapper: {
    display: 'grid',
    gridTemplateColumns: '30px 1fr',
    padding: 0,

  },
  additionalBlockItem: {
    [theme.breakpoints.down('xl')]: {
      color: '#404040',
      marginLeft: theme.spacing(1),
      '& span': {
        fontSize: 14,
      },
    },
  },

}));

const CustomListItem = ({text = '', link, icon}) => {
  const classes = useStyles();
  return (
      <ListItem
          button
          component={NavLink} to={`/${link}`} className={classes.additionalBlockItemWrapper}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText className={classes.additionalBlockItem} primary={text}/>
      </ListItem>
  );
};

export default function ElectricityBalances  ()  {
  const classes = useStyles();
  return (
      <Container maxWidth="md">
        <Box className={classes.gridContainer}>

          <Grid item xs={9} lg={12}>
            <Paper className={classes.paper} elevation={4}>

              <Typography className={classes.blockHeader} variant={'h5'}>Работа со схемами подключения и головным учетом</Typography>
              <Divider/>
              <Box className={classes.mainBlockItemsWrapper}>
                <ButtonBase component={NavLink} to={`${ELECTRICITY_BALANCES_PATH}${SERTIFICATION}`}>
                  <Card className={classes.mainBlockItem} elevation={3}>
                    <Typography className={classes.mainBlockItemTitle}>Аттестация точки учета</Typography>
                    <OfflineBoltRoundedIcon fontSize={'large'}/>
                  </Card>
                </ButtonBase>
                <ButtonBase>
                  <Card className={classes.mainBlockItem} elevation={3}>
                    <Typography className={classes.mainBlockItemTitle}>Регистрация схемы
                      подключения</Typography>
                    <AccountTreeRoundedIcon fontSize={'large'}/>
                  </Card>
                </ButtonBase>
                <ButtonBase component={NavLink} to={`${ELECTRICITY_BALANCES_PATH}${REGISTRATION}`}>
                  <Card className={classes.mainBlockItem} elevation={3}>
                    <Typography className={classes.mainBlockItemTitle}>Регистрация точек учета на головной учет</Typography>
                    <QueuePlayNextRoundedIcon fontSize={'large'}/>
                  </Card>
                </ButtonBase>
                <ButtonBase>
                  <Card className={classes.mainBlockItem} elevation={3}>
                    <Typography className={classes.mainBlockItemTitle}>Наряд на снятие показаний головного
                      учета</Typography>
                    <NoteAddRoundedIcon fontSize={'large'}/>
                  </Card>
                </ButtonBase>

              </Box>
            </Paper></Grid>
          <Grid item xs={9} lg={12}>
            <Paper className={classes.paper} elevation={4}>
              <Typography className={classes.blockHeader} variant={'h6'}>Вспомогательная информация</Typography>
              <Divider/>
              <Box className={classes.additionalBlockItemsWrapper}>

                <List component="nav" aria-label="secondary mailbox folders">
                  <Typography className={classes.additionalBlockTitles}>Справочники</Typography>
                  <CustomListItem text={'Подстанции'} link={''} icon={<MenuBookRoundedIcon/>}/>


                  <CustomListItem text={'ТП'} link={''} icon={<MenuBookRoundedIcon/>}/>
                  <CustomListItem text={'Прочие узлы учета(КТП, РП, ТП-04, общедомовой учет)'} link={''} icon={<MenuBookRoundedIcon/>}/>
                  <CustomListItem text={'Точки учета'} link={''} icon={<MenuBookRoundedIcon/>}/>
                  <Typography className={classes.additionalBlockTitles}>Отчеты</Typography>
                  <CustomListItem text={'Отчет по головному учету'} link={''} icon={<PieChartRoundedIcon/>}/>
                  <CustomListItem text={'Головной учет анализ небаланса по ПС и ЛЭП'} link={''} icon={<PieChartRoundedIcon/>}/>
                  <CustomListItem text={'Точки учета головного учета'} link={''} icon={<PieChartRoundedIcon/>}/>
                </List>
                <List component="nav" aria-label="secondary mailbox folders">
                  <Box style={{marginTop: 5}}/>
                  <CustomListItem text={'Головной учет анализ небаланса по ПС и ЛЭП оперативно'} link={''} icon={<PieChartRoundedIcon/>}/>
                  <CustomListItem text={'Отчет по разным уровням баланса ЭЭ'} link={''} icon={<PieChartRoundedIcon/>}/>
                  <CustomListItem text={'Расчет фактического небаланса'} link={''} icon={<PieChartRoundedIcon/>}/>
                  <CustomListItem text={'Отчет по входу в сеть'} link={''} icon={<PieChartRoundedIcon/>}/>
                  <CustomListItem text={'Головной учет по входу в сеть'} link={''} icon={<PieChartRoundedIcon/>}/>
                  <CustomListItem text={'Головной учет: Ведомость показаний приборов учета подстанций РЭС'} link={''} icon={<PieChartRoundedIcon/>}/>
                  <CustomListItem text={'Головной учет: Распределение отпущенной электроэнергии ЭСО'} link={''} icon={<PieChartRoundedIcon/>}/>
                  <CustomListItem text={'Итоговая форма распределения по РЭСв разрезе ЭСО с разбивкой по кслассам напряжения'} link={''} icon={<PieChartRoundedIcon/>}/>


                </List>

              </Box>
            </Paper>
          </Grid>


        </Box>
      </Container>
  );
};
