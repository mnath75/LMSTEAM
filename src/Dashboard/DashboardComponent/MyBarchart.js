import React, {useEffect, useState} from "react";
import { BarChart, Bar, } from "recharts";
import {makeStyles} from "@material-ui/core/styles";
const data = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
    { name: "Geek-i-knack", students: 200 },
    { students: 400 },
    { students: 100 },
    { students: 300 },
    { students: 500 },
    { students: 300 },
    { students: 150 },
    { students: 600 },
    { students: 550 },
    { students: 300 },
    { students: 100 },
    { students: 300 },
    { students: 500 },
    { students: 300 },
    { students: 150 },
    { students: 600 },
    { students: 550 },
    { students: 300 },
    { students: 100 },
    { students: 300 },
    { students: 500 },
    { students: 300 },
    { students: 150 },
    { students: 600 },
    { students: 550 },
    { students: 300 },
    { students: 100 },
    { students: 300 },
    { students: 500 },
    { students: 300 },
    { students: 150 },


];

export default function MyBarchart() {
    const classes = useStyles();

    return (
        <div style={{width:'100%',display:'flex',justifyContent:'center'}} className={'flex-column align-items-center'}>
            <h5>720</h5>
            <p>Courses - Last 48 hours</p>
            <BarChart width={260}  height={140} data={data} className={classes.barchart}>
                <Bar dataKey="students" fill="#34a3cf" />
            </BarChart>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    barchart:{
        width:'320px'
    }
}));