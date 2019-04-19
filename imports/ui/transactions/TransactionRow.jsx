
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, Spinner } from 'reactstrap';
import { TxIcon } from '../components/Icons.jsx';
import Activities from '../components/Activities.jsx';
import CosmosErrors from '../components/CosmosErrors.jsx';
import TimeAgo from '../components/TimeAgo.jsx';
import numeral from 'numeral';

export const TransactionRow = (props) => {
    let tx = props.tx;
    // console.log(tx);
    return <Row className={(tx.code)?"tx-info invalid":"tx-info"}>
        <Col xs={12} lg={7} className="activity">{(tx.tx.value.msg && tx.tx.value.msg.length >0)?tx.tx.value.msg.map((msg,i) => {
            return <Card body key={i}><Activities msg={msg} invalid={(!!tx.code)} tags={tx.tags} /></Card>
        }):''}</Col>
        <Col xs={{size:6,order:"last"}} md={{size:3, order: "last"}} lg={{size:1,order:"last"}} className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i> <Link to={"/transactions/"+tx.txhash}>{tx.txhash}</Link></Col>
        <Col xs={6} md={9} lg={{size:2,order:"last"}} className="text-nowrap"><i className="material-icons">schedule</i> <span>{tx.block()?<TimeAgo time={tx.block().time} />:''}</span></Col>
        <Col xs={4} md={2} lg={1}><i className="fas fa-database d-lg-none"></i> <Link to={"/blocks/"+tx.height}>{numeral(tx.height).format(0,0)}</Link></Col>
        <Col xs={2} md={1}>{(!tx.code)?<TxIcon valid />:<TxIcon />}</Col>
        <Col xs={6} md={9} lg={2} className="fee"><i className="material-icons d-lg-none">monetization_on</i> {tx.tx.value.fee.amount?tx.tx.value.fee.amount.map((fee,i) => {
            return <span className="text-nowrap" key={i}>{numeral(fee.amount).format(0,0)} {fee.denom}</span>
        }):<span>No fee</span>}</Col>
        {(tx.code)?<Col xs={{size:12, order:"last"}} className="error">
            <Alert color="danger">
                <CosmosErrors 
                    code={tx.code}
                    logs={tx.logs}
                    gasWanted={tx.gas_wanted}
                    gasUses={tx.gas_used}
                />
            </Alert>
        </Col>:''}
    </Row>
}