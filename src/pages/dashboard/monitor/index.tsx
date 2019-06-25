import { Card, Col, Row, Statistic, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import numeral from 'numeral';
import { StateType } from './model';
import { Pie, WaterWave, Gauge, TagCloud } from './components/Charts';
import ActiveChart from './components/ActiveChart'; 
import { Axis, Chart, Geom, Coord,Label,Legend,Facet } from 'bizcharts';
import styles from './style.less';

const { Countdown } = Statistic;

const targetTime = new Date().getTime() + 3900000;

interface MonitorProps {
  dashboardMonitor: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}

@connect(
  ({
    dashboardMonitor,
    loading,
  }: {
    dashboardMonitor: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    dashboardMonitor,
    loading: loading.models.monitor,
  }),
)
class Monitor extends Component<MonitorProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardMonitor/fetchTags',
    });
  }

  render() {
    const { dashboardMonitor, loading } = this.props;
    const { tags } = dashboardMonitor;
    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={24}>
            {/* <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboard-monitor.monitor.trading-activity"
                    defaultMessage="Real-Time Trading Activity"
                  />
                }
                bordered={false}
              >
                <Row>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="dashboard-monitor.monitor.total-transactions"
                          defaultMessage="Total transactions today"
                        />
                      }
                      suffix="元"
                      value={numeral(124543233).format('0,0')}
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="dashboard-monitor.monitor.sales-target"
                          defaultMessage="Sales target completion rate"
                        />
                      }
                      value="92%"
                    />
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="dashboard-monitor.monitor.remaining-time"
                          defaultMessage="Remaining time of activity"
                        />
                      }
                    >
                      <Countdown value={targetTime} />
                    </Statistic>
                  </Col>
                  <Col md={6} sm={12} xs={24}>
                    <Statistic
                      title={
                        <FormattedMessage
                          id="dashboard-monitor.monitor.total-transactions-per-second"
                          defaultMessage="Total transactions per second"
                        />
                      }
                      suffix="元"
                      value={numeral(234).format('0,0')}
                    />
                  </Col>
                </Row>
                <div className={styles.mapChart}>
                  <Tooltip
                    title={
                      <FormattedMessage
                        id="dashboard-monitor.monitor.waiting-for-implementation"
                        defaultMessage="Waiting for implementation"
                      />
                    }
                  >
                    <img
                      src="https://gw.alipayobjects.com/zos/rmsportal/HBWnDEUXCnGnGrRfrpKa.png"
                      alt="map"
                    />
                  </Tooltip>
                </div>
              </Card>
            </Col> */}
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={"费用预测"}
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                <ActiveChart />
              </Card>
              <Card
                title={"节能分布"}
                style={{ marginBottom: 24 }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
                <Chart 
                  height={200}
                  forceFit={true}
                  data={[{
                    company: 'Apple',
                    type: '整体',
                    value: 30
                  }, {
                    company: 'Facebook',
                    type: '整体',
                    value: 35
                  }, {
                    company: 'Google',
                    type: '整体',
                    value: 28
                  }, {
                    company: 'Apple',
                    type: '1号楼',
                    value: 40
                  }, {
                    company: 'Facebook',
                    type: '1号楼',
                    value: 65
                  }, {
                    company: 'Google',
                    type: '1号楼',
                    value: 47
                  }, {
                    company: 'Apple',
                    type: '2号楼',
                    value: 23
                  }, {
                    company: 'Facebook',
                    type: '2号楼',
                    value: 18
                  }, {
                    company: 'Google',
                    type: '2号楼',
                    value: 20
                  }, {
                    company: 'Apple',
                    type: '2号楼',
                    value: 35
                  }, {
                    company: 'Facebook',
                    type: '2号楼',
                    value: 30
                  }, {
                    company: 'Google',
                    type: '2号楼',
                    value: 25
                  }]}
                  padding={'auto'}
                >
                  <Axis
                    name="type"
                    title={false}
                    label={null ? undefined : {}}
                    tickLine={null ? undefined : {}}
                  />
                  <Axis name="value" min={0} /> 
                  <Geom type="interval" position="type*value" color={'company'} />
                </Chart>
              </Card>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={"月度用量"}
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                <Chart 
                  height={200}
                  forceFit={true}
                  data={[
                    {x: "1月", y: 881}, 
                    {x: "2月", y: 307}, 
                    {x: "3月", y: 522}, 
                    {x: "4月", y: 704}, 
                    {x: "5月", y: 217}
                  ]}
                  padding={'auto'}
                >
                  <Axis
                    name="x"
                    title={false}
                    label={null ? undefined : {}}
                    tickLine={null ? undefined : {}}
                  />
                  <Axis name="y" min={0} /> 
                  <Geom type="interval" position="x*y" color={'green'} />
                </Chart>
              </Card>
              <Card
                title={"内存使用率"}
                style={{ marginBottom: 24 }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
                <Gauge
                  title={formatMessage({
                    id: 'dashboard-monitor.monitor.ratio',
                    defaultMessage: 'Ratio',
                  })}
                  height={200}
                  percent={87}
                />
              </Card>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={"区域分布"}
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                 <Chart 
                  height={200}
                  forceFit={true}
                  data={[{
                    location: '三亚',
                    value: 44.9,
                    percent: 44.9
                  }, {
                    location: '千岛湖',
                    value: 19.7,
                    percent: 19.7
                  }, {
                    location: '柬埔寨',
                    value: 17.3,
                    percent: 17.3
                  }, {
                    location: '呼伦贝尔',
                    value: 14.4,
                    percent: 14.4
                  }, {
                    location: '苏梅岛',
                    value: 2.5,
                    percent: 2.5
                  }, {
                    location: '塞班岛',
                    value: 2.5,
                    percent: 2.5
                  }]}
                  padding={'auto'}
                  
                >
                 <Coord type="theta" radius={1} />
                 <Geom type="intervalStack" 
                  position="value" 
                  color={['location',['#1890ff', '#37c661', '#fbce1e', '#2b3b79', '#8a4be2', '#1dc5c5']]}  
                  style={
                    {
                      stroke: 'white',
                      lineWidth: 1
                    }
                  }
                 />
                 <Legend position={"right-center"} offsetX={-50} />
                  
                </Chart>
              </Card>
              <Card
                title={"柱状分布"}
                style={{ marginBottom: 24 }}
                bodyStyle={{ textAlign: 'center' }}
                bordered={false}
              >
                <Chart 
                  height={200}
                  forceFit={true}
                  data={[{
                    country: '乌拉圭',
                    type: '2016 年转基因种植面积',
                    value: 1.3
                  }, {
                    country: '乌拉圭',
                    type: '2016 年耕地总面积',
                    value: 1.8
                  }, {
                    country: '巴拉圭',
                    type: '2016 年转基因种植面积',
                    value: 3.6
                  }, {
                    country: '巴拉圭',
                    type: '2016 年耕地总面积',
                    value: 5.5
                  }, {
                    country: '南非',
                    type: '2016 年转基因种植面积',
                    value: 3.7
                  }, {
                    country: '南非',
                    type: '2016 年耕地总面积',
                    value: 12.1
                  }, {
                    country: '巴基斯坦',
                    type: '2016 年转基因种植面积',
                    value: 2.9
                  }, {
                    country: '巴基斯坦',
                    type: '2016 年耕地总面积',
                    value: 22.0
                  }, {
                    country: '阿根廷',
                    type: '2016 年转基因种植面积',
                    value: 23.8
                  }, {
                    country: '阿根廷',
                    type: '2016 年耕地总面积',
                    value: 38.6
                  }, {
                    country: '加拿大',
                    type: '2016 年转基因种植面积',
                    value: 11.6
                  }, {
                    country: '加拿大',
                    type: '2016 年耕地总面积',
                    value: 46.9
                  }, {
                    country: '巴西',
                    type: '2016 年转基因种植面积',
                    value: 49.1
                  }, {
                    country: '巴西',
                    type: '2016 年耕地总面积',
                    value: 73.2
                  }, {
                    country: '中国',
                    type: '2016 年转基因种植面积',
                    value: 2.8
                  }, {
                    country: '中国',
                    type: '2016 年耕地总面积',
                    value: 108.4
                  }, {
                    country: '美国',
                    type: '2016 年转基因种植面积',
                    value: 72.9
                  }, {
                    country: '美国',
                    type: '2016 年耕地总面积',
                    value: 165.2
                  }, {
                    country: '印度',
                    type: '2016 年转基因种植面积',
                    value: 49.1
                  }, {
                    country: '印度',
                    type: '2016 年耕地总面积',
                    value: 175.4
                  }]}
                  padding={'auto'}
                  
                >
                 
                  <Axis name="value" visible={false} />  
                  <Facet type="mirror" autoSetAxis={false} fields={['type']} showTitle={false} padding={[0,10,0,0]} eachView={(view, facet)=>{
                       var facetIndex = facet.colIndex;
                       if (facetIndex === 0) {
                         view.axis('country', {
                           position: 'top',
                           label: {
                             textStyle: {
                               fill: '#aaaaaa',
                               fontSize: 12
                             }
                           },
                           tickLine: {
                             alignWithLabel: false,
                             length: 0
                           },
                           line: {
                             lineWidth: 0
                           }
                         });
                       } else {
                         view.axis('country', false);
                       }
                       var color = facetIndex === 0 ? '#1890ff' : '#2fc25b';
                       view.interval().position('country*value').color(color).size(30).opacity(1).label('value', function(val) {
                        var offset = -4;
                        var shadowBlur = 2;
                        var textAlign = facetIndex === 1 ? 'end' : 'start';
                        var fill = 'white';
                        if (val < 15) {
                          offset = 4;
                          textAlign = facetIndex === 1 ? 'start' : 'end';
                          fill = '#666666';
                          shadowBlur = 0;
                        }
                        return {
                          //position: 'middle',
                          offset: offset,
                          textStyle: {
                            fill: fill,
                            shadowBlur: shadowBlur,
                            shadowColor: 'rgba(0, 0, 0, .45)',
                            textAlign: textAlign
                          }
                        };
                      });
                    }
                  } />
    
                </Chart>
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={"产出对比"}
                bordered={false}
                className={styles.pieCard}
              >
                <Row style={{ padding: '16px 0' }}>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      percent={28}
                      title={
                        <FormattedMessage
                          id="dashboard-monitor.monitor.fast-food"
                          defaultMessage="Fast food"
                        />
                      }
                      total="28%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      color="#5DDECF"
                      percent={22}
                      title={
                        <FormattedMessage
                          id="dashboard-monitor.monitor.western-food"
                          defaultMessage="Western food"
                        />
                      }
                      total="22%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      color="#2FC25B"
                      percent={32}
                      title={
                        <FormattedMessage
                          id="dashboard-monitor.monitor.hot-pot"
                          defaultMessage="Hot pot"
                        />
                      }
                      total="32%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboard-monitor.monitor.popular-searches"
                    defaultMessage="Popular Searches"
                  />
                }
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <TagCloud data={tags || []} height={161} />
              </Card>
            </Col>
            <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={
                  <FormattedMessage
                    id="dashboard-monitor.monitor.resource-surplus"
                    defaultMessage="Resource Surplus"
                  />
                }
                bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                bordered={false}
              >
                <WaterWave
                  height={161}
                  title={
                    <FormattedMessage
                      id="dashboard-monitor.monitor.fund-surplus"
                      defaultMessage="Fund Surplus"
                    />
                  }
                  percent={34}
                />
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Monitor;
