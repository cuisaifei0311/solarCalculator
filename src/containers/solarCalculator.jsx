import React, { useState, useEffect } from 'react';
import { Slider, Card, Typography, Divider, Row, Col, Button } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined,MoneyCollectOutlined} from '@ant-design/icons';
import useApi from '../hooks/useApi';
import { set } from 'lodash';

const { Title, Text } = Typography;

const SolarCalculator = () => {
    const marks = {
        200: '200',
        225: '225',
        250: '250',
        275: '275',
        300: '300',
        325: '325',
        350: '350',
        375: '375',
        400: '400',
        425: '425',
        450: '450',
        475: '475',
        500: '500',
    };

    const systemSizeList = [4.55, 5.20, 5.85, 6.50, 7.15, 7.80, 8.45]

    const [value, setValue] = useState(200);  // State for electricity bill value
    const [mostSaving, setMostSaving] = useState(0);  // State for most savings amount
    const [minBill, setMinBill] = useState(0);  // State for minimum bill amount
    // const [systemSize,setSystemSize] = useState(systemSizeList[0]); // State for system size
    const [currentIdx, setCurrentIdx] = useState(0); // State for current index
    const [count, setCount] = useState(0);

    // API hook for fetching savings data based on the electricity bill
    const loginApi = useApi('/default/dynamic/user/calculator/init', 'POST', { body: { bill: value } });
    const updateApi = useApi('/default/dynamic/user/calculator/update', 'POST', { body: { bill: value, index: currentIdx } });

    // Trigger API call when the value changes (this will refetch data)
    useEffect(() => {
        loginApi.refetch();
        console.log('API Data:', loginApi.data); // Log the response for debugging
    }, [value]);

    // Update mostSaving state when the data from the API is ready
    useEffect(() => {
        if (loginApi.data && loginApi.data.data && loginApi.data.data.maxSaving !== undefined) {
            setMostSaving(loginApi.data.data.maxSaving);
            setMinBill(loginApi.data.data.minBill);
            // setSystemSize(systemSizeList[loginApi.data.data.maxIndex]);
            setCurrentIdx(loginApi.data.data.maxIndex);
            console.log('Most Saving:', loginApi.data.data.maxSaving); // Log the most saving amount for debugging
        }
    }, [loginApi.data]); // Trigger this effect when loginApi.data changes

    // updateApi

    useEffect(() => {
        updateApi.refetch();
        console.log('API Data:', updateApi.data); // Log the response for debugging
    }, [currentIdx]);

    useEffect(() => {
        if (updateApi.data && updateApi.data.data && updateApi.data.data.maxSaving !== undefined) {
            setMostSaving(updateApi.data.data.maxSaving);
            setMinBill(updateApi.data.data.minBill);
            // setSystemSize(systemSizeList[updateApi.data.data.maxIndex]);
            setCurrentIdx(updateApi.data.data.maxIndex);
            console.log('update Most Saving:', updateApi.data.data.maxSaving); // Log the most saving amount for debugging
        }
    }, [count]); // Trigger this effect when loginApi.data changes

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Title style={{ color: '#249153', marginBottom: '20px', marginTop: '20px' }}>OUR AFFORDABLE SOLUTIONS</Title>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Card
                    style={{
                        width: 1000,
                        padding: '20px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        borderRadius: '8px',
                        textAlign: 'center',
                        background: 'linear-gradient(90deg, #E4FDE1, #FCFDE1)'
                    }}
                >
                    <Title level={3} style={{ color: '#249153' }}>SEE HOW MUCH YOU CAN SAVE</Title>
                    <Text type="secondary">Use our solar calculator to help you work out your potential monthly savings.</Text>
                    <Divider />
                    <Title level={4}>MY MONTHLY ELECTRICITY BILL</Title>
                    <div style={{ margin: '30px 0' }}>
                        <Slider
                            marks={marks}
                            step={null} // Only allow selection at marked points
                            min={200}
                            max={500}
                            defaultValue={value}
                            onChange={setValue}
                            tooltip={{ formatter: val => `RM${val}` }} // Show tooltip with "RM" prefix
                        />
                    </div>
                </Card>
                <Card
                    style={{
                        width: 300,
                        borderRadius: '8px',
                        textAlign: 'center',
                        height: 200,
                        marginTop: 25,
                        alignSelf: 'flex-start',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                         background: 'linear-gradient(100deg, #50A776, #629BF8)'
                    }}
                >
                    <Title level={4} style={{color:'white'}}>Most Saving</Title>
                    <Title level={2} style={{color:'white'}}>{`RM ${mostSaving}`}</Title> {/* Display most saving */}
                    <Title level={4} style={{color:'white'}}>After Rental Cost</Title>
                </Card>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 25 }}>
                    <Title level={4} style={{ marginBottom: 10 }}>System Size Recommendation</Title>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Card
                            style={{
                                width: 300,
                                borderRadius: '8px',
                                textAlign: 'center',
                                height: 100,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                marginRight: 25,
                                background: 'linear-gradient(90deg, #E4FDE1, #FCFDE1)'
                            }}
                        >
                            <Row justify='space-between' align="middle">
                                <Col>
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<DoubleLeftOutlined />}
                                        size='large'
                                        onClick={() => {
                                            if (currentIdx > 0) { setCount(count + 1); setCurrentIdx(currentIdx - 1); setSystemSize(systemSizeList[currentIdx - 1]) }
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Title level={3} style={{ margin: 0 }}>
                                        <Title level={3}>{`${systemSizeList[currentIdx]} kWp`}</Title> {/* Display most saving */}
                                    </Title>
                                </Col>
                                <Col>
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        icon={<DoubleRightOutlined />}
                                        size='large'
                                        onClick={() => { if (currentIdx < 6) { setCount(count + 1); setCurrentIdx(currentIdx + 1); setSystemSize(systemSizeList[currentIdx + 1]) } }}
                                    />
                                </Col>
                            </Row>
                        </Card>
                        <Card
                            style={{
                                width: 300,
                                borderRadius: '8px',
                                textAlign: 'center',
                                height: 250,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                background: '#648381'
                            }}
                        >
                            <MoneyCollectOutlined style={{ marginRight: 8, fontSize: '24px' }} />
                            <Title level={3}>{`RM ${value}`}</Title> {/* Display most saving */}
                            <Divider />
                            <Text type="secondary" style={{color:'white'}}>Current Electricity Bill per Month Without Solar Panel</Text>
                        </Card>
                        <Card
                            style={{
                                width: 300,
                                borderRadius: '8px',
                                textAlign: 'center',
                                height: 250,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                marginLeft: 25,
                                background: '#8ACB88'
                            }}
                        >
                            <MoneyCollectOutlined style={{ marginRight: 8, fontSize: '24px' }} />
                            <Title level={3}>{`RM ${minBill}`}</Title> {/* Display most saving */}
                            <Divider />
                            <Text type="secondary" style={{color:'white'}}>New Electricity Bill per Month With Solar Panel</Text>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolarCalculator;
