import {LineChart,ResponsiveContainer,Legend, Tooltip,Line,XAxis,YAxis,CartesianGrid} from 'recharts';
function MyLinechart(props) {
    return (
        <>
            <div className={'px-lg-3 my-3'}>
            <ResponsiveContainer width="100%" height={200} aspect={0}>
                <LineChart data={props.data} >
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date"
                           interval={'preserveStartEnd'} />
                    <YAxis orientation="right"></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey={props.name}
                          stroke="#95cbe0" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
        </>
    );
}
export default MyLinechart;
