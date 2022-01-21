import React  from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {withStyles} from "@material-ui/core";
export default function MicedChart(props) {
        return (
            <>
                <h4 className={'font-weight-bold px-2'}>Students Active Timing</h4>
                <p className={'px-2'}>Last 28 days</p>
            <ResponsiveContainer width="100%" height={200} aspect={0}>
                <BarChart width={500} height={200} data={props.data} margin={{top: 0,right: 30,left: 20,bottom: 5,}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" /><YAxis />
                    {/*<Tooltip />*/}
                    <Bar dataKey="pv" stackId="a" fill="#800080" />
                    <Bar dataKey="uv" stackId="a" fill="#DDA0DD" />
                    <Bar dataKey="pv" stackId="a" fill="#EE82EE" />
                    <Bar dataKey="pv" stackId="a" fill="#DA70D6" />
                    <Bar dataKey="pv" stackId="a" fill="#BA55D3" />
                    <Bar dataKey="pv" stackId="a" fill="#E6E6FA" />
                    <Bar dataKey="pv" stackId="a" fill="#D8BFD8" />
                </BarChart>
            </ResponsiveContainer>
                </>
        );
    }
