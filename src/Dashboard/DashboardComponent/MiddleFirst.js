import React, {useState} from 'react'
import MyLinechart from './MyLinechart';
import MixedChart from "./MixedChart";
import {makeStyles, Grid,TextField,MenuItem,Divider} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '10px',
        border: '1px solid #ccc',
    },
    chart: {
        marginLeft: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
        },
    },
    icons: {
        fontSize: '15px',
        fontWeight: 'bold',
        background: '#02810e',
        borderRadius: '50%',
        color: 'white',
        marginLeft: '1px'
    },
    box: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '2px 2px 2px grey',
        cursor: 'pointer',
    },
    TextFieldHeight: {
        height: 35,
        width: 300
    },

}));
const cards = [
    {title: 'Sign Ups', value: '4.5K ', des: '3.2K more than usual',active:120,inactive:10,},
    {title: 'Apps Downloads', value: '4.5K ', des: '3.2K more than usual',active:142,inactive:40,},
    {title: ' Courses Sold', value: '4.5K ', des: '3.2K more than usual',active:100,inactive:19,},
    {title: 'Revenue', value: '7.5K ', des: '3.2K more than usual',active:1220,inactive:120,},
]
const pdata = [
    {
        date: 'Dec 10 2021',
        student: 5,
        fees: 120,

    },
    {
        date: 'Dec 10 2021',
        student: 2,
    },
    {
        date: 'Dec 10 2021',
        student: 5,

    },
    {
        date: 'Dec 10 2021',
        student: 10,
    },
    {
        date: 'Dec 10 2021',
        student: 9,
    },
    {
        date: 'Dec 10 2021',
        student: 10,
    },
];
const pdata1 = [
    {
        date: 'Dec 12 2021',
        download: 5,
        fees: 120
    },
    {
        date: 'Dec 13 2021',
        download: 2,
        fees: 10

    },
    {
        date: 'Dec 14 2021',
        download: 5,
        fees: 120
    },
    {
        date: 'Dec 15 2021',
        download: 10,
        fees: 180

    },
    {
        date: 'Dec 16 2021',
        download: 9,
    },
    {
        date: 'Dec 17 2021',
        download: 100,
    },
];
const pdata2 = [
    {
        date: 'Dec 12 2021',
        Courses_sold: 155,
        fees: 120
    },
    {
        date: 'Dec 13 2021',
        Courses_sold: 2,
        fees: 10

    },
    {
        date: 'Dec 14 2021',
        Courses_sold: 5,
        fees: 120
    },
    {
        date: 'Dec 15 2021',
        Courses_sold: 10,
        fees: 180

    },
    {
        date: 'Dec 16 2021',
        Courses_sold: 9,
    },
    {
        date: 'Dec 17 2021',
        Courses_sold: 10,
    },
];
const pdata3 = [
    {
        date: 'Dec 12 2021',
        revenue: 455,
        fees: 120
    },
    {
        date: 'Dec 13 2021',
        revenue: 200,
        fees: 10

    },
    {
        date: 'Dec 14 2021',
        revenue: 5,
        fees: 120
    },
    {
        date: 'Dec 15 2021',
        revenue: 100,
        fees: 180

    },
    {
        date: 'Dec 16 2021',
        revenue: 900,
    },
    {
        date: 'Dec 17 2021',
        revenue: 10,
    },
];
const data = [
    {
        name: 'Sunday',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Monday',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Tuesday',
        uv: 2000,
        pv: 3000,
        amt: 2290,
    },
    {
        name: 'Wednesday',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Thursday',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Friday',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Saturday',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const data1 = [
    {
        name: 'Sunday',
        uv: 900,
        pv: 12400,
        amt: 2400,
    },
    {
        name: 'Monday',
        uv: 30000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Tuesday',
        uv: 20000,
        pv: 3000,
        amt: 290,
    },
    {
        name: 'Wednesday',
        uv: 2780,
        pv: 39008,
        amt: 2000,
    },
    {
        name: 'Thursday',
        uv: 18090,
        pv: 48000,
        amt: 2181,
    },
    {
        name: 'Friday',
        uv: 2390,
        pv: 3800,
        amt: 25000,
    },
    {
        name: 'Saturday',
        uv: 3490,
        pv: 43000,
        amt: 2100,
    },
];
export default function Middlefirst() {
    const [active, setActive] = useState(0);
    const [chartData, setCharData] = useState(pdata);
    const [selectedDate, setSelectedDate] = React.useState(new Date().toDateString());
    const [mixedChart, setMixedChart] = useState(data)
    const [title, setTitle] = useState('student')
    const classes = useStyles();
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    function GetData(index) {
        setActive(index);
        if (index === 1) {
            setCharData(pdata1);
            setTitle('download');
            setMixedChart(data)
        } else if (index === 2) {
            setCharData(pdata2);
            setTitle('Courses_sold');
            setMixedChart(data1)
        } else if (index === 3) {
            setCharData(pdata3);
            setTitle('revenue');
            setMixedChart(data)
        } else {
            setCharData(pdata);
            setTitle('student');
            setMixedChart(data1)
        }
    }
    return (
        <>
            <Grid item xs={12}>
                {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                {/*    <div className={'mx-2 d-flex justify-content-end'}>*/}
                {/*        <KeyboardDatePicker*/}
                {/*            margin="normal"*/}
                {/*            id="date-picker-dialog"*/}
                {/*            label="Select Date"*/}
                {/*            format="MM/dd/yyyy"*/}
                {/*            value={selectedDate}*/}
                {/*            onChange={handleDateChange}*/}
                {/*            KeyboardButtonProps={{*/}
                {/*                'aria-label': 'change date',*/}
                {/*            }}/> </div> </MuiPickersUtilsProvider>*/}
                    <div className={'mx-2 d-flex justify-content-end'}>
                <TextField select label={'Select Date'}  InputProps={{className: classes.TextFieldHeight}} >
                    <MenuItem  value={''}>Select</MenuItem>
                    <MenuItem  value={'7'}>Last 7 Days</MenuItem>
                    <MenuItem  value={'7'}>Last 28 Days</MenuItem>
                    <MenuItem  value={'7'}>Last 90 Days</MenuItem>
                    <MenuItem  value={'7'}>Last 365 Days</MenuItem>
                    <Divider/>
                    <MenuItem  value={'15'}>Lifetime</MenuItem>
                    <Divider/>
                    <MenuItem  value={'monyh_1'}>2022</MenuItem>
                    <MenuItem  value={'monyh_1'}>2021</MenuItem>
                    <Divider/>
                    <MenuItem  value={'monyh_2'}>January</MenuItem>
                    <MenuItem  value={'monyh_2'}>December 2021</MenuItem>
                    <MenuItem  value={'monyh_2'}>November 2021</MenuItem>
                    <Divider/>
                    <MenuItem  value={'monyh_2'}>Custom</MenuItem>
                </TextField>
                    </div>
            </Grid>

            <div className={classes.root}>
                <Grid container>
                    {cards.map((value, index) => (
                        <Grid item xs={12} sm={6} md={6} lg={3}>

                                <div  onClick={() => {GetData(index)}} className={classes.box} style={{
                                    borderTop: active === index ? '3px solid blue' : '3px solid transparent',
                                    background: active === index ? '#fff' : '#eee'}}>
                                    <h6 className='text-dark'>{value.title}</h6>
                                    <h5>{value.value} <ArrowUpwardRoundedIcon className={classes.icons}/></h5>
                                    <p className='text-muted'>{value.des}</p>
                                </div>

                        </Grid>
                    ))}
                </Grid>
                <Grid container className={classes.chart}>
                    <Grid item xs={12}><MyLinechart data={chartData} name={title}/></Grid>
                </Grid>
            </div>
            <div className={'container-fluid my-3'}>
                <div className={'row'}>
                    <div className={'col-12'}>
                        <MixedChart data={mixedChart}/>
                    </div>
                </div>
            </div>
        </>
    )
}
