import React, { Component } from 'react';
import { Button } from 'antd';

export default class ChartView extends Component {

    showChartView(){
        window.open("https://antv.alipay.com/zh-cn/g2/3.x/demo/bar/bar-diverge.html","_blank");
    }

    render() {
        return <Button type="primary" onClick={()=>this.showChartView()}>查看图形</Button>
    }
}