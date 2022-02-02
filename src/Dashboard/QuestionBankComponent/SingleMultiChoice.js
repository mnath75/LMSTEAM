import {makeStyles} from "@material-ui/core";

export default function SingleMultiChoice() {
    const classes = styles();
    return (
        <>
            <div className={'container-fluid'}>
                <div className={'row'}>
                    <div className={'col-10 bg-info'}>
                        <div className={'row '}>
1
                        </div>
                    </div>
                    <div className={'col-2 bg-danger'}>1</div>
                    <div className={'col-12'}>
                        <div className={classes.box}>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
const styles = makeStyles((theme) => ({
    box: {
        width: '100%',
        minHeight: 150,
        border: '1px solid grey'
    }
}))