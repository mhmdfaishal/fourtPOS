import React, { useEffect, useState } from 'react'
import Base from '../Layouts/Base'
import ReactApexChart from 'react-apexcharts'
import { includes } from 'lodash';

export default function Dashboard(props) {
    const {data: totalCategories} = props.totalCategories; 
    const {data: totalProducts} = props.totalProducts;
    const {data: totalSales} = props.totalSales;
    const {data: totalPurchases} = props.totalPurchases;
    const {sale, outcome} = props;
  
    const [state, setState] = useState([])

    var dataIncome = [0]
    var dataIncomeDate = ["11/1/2022"]
    
    var dataSale = [0]
    var dataSaleDate = ["11/1/2022"]

    sale.forEach((item) => {
        if(dataIncomeDate.includes(item.date)){
          var idx = dataIncomeDate.indexOf(item.date)
          dataIncome[idx] = dataIncome[idx] + item.sum_of_sub_total
          dataSale[idx] += 1
        }else {
          dataIncomeDate.push(item.date)
          dataIncome.push(item.sum_of_sub_total)
          dataSale.push(1)
          dataSaleDate.push(item.date)
        }
    })

    var dataOutcome = [0]
    var dataOutcomeDate = ["11/1/2022"]
    outcome.forEach((item) => {
        if(dataOutcomeDate.includes(item.date)){
          var idx = dataOutcomeDate.indexOf(item.date)
          dataOutcome[idx] = dataOutcome[idx] + item.total_amount
        }else {
          dataOutcomeDate.push(item.date)
          dataOutcome.push(item.total_amount)
        }
    })

    // set ReactApexChart options
    const optionsSales = {
        chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: 3,
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: dataSaleDate,
            tickAmount: 10,
            labels: {
              formatter: function(value, timestamp, opts) {
                return opts.dateFormatter(new Date(timestamp), 'dd MMM')
              }
            }
          },
          title: {
            text: 'Total Penjualan',
            align: 'center',
            margin: 20,
            style: {
              fontSize: "16px",
              fontFace: 'Roboto',
              color: '#f57328'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: [ '#f57328'],
              shadeIntensity: 1,
              type: 'horizontal',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100]
            },
          },
        }
    const optionsIncome = {
        chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: 3,
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: dataIncomeDate,
            tickAmount: 10,
            labels: {
              formatter: function(value, timestamp, opts) {
                return opts.dateFormatter(new Date(timestamp), 'dd MMM')
              }
            }
          },
          title: {
            text: 'Total Pemasukan',
            align: 'center',
            margin: 20,
            style: {
              fontSize: "16px",
              fontFace: 'Roboto',
              color: '#f57328'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: [ '#f57328'],
              shadeIntensity: 1,
              type: 'horizontal',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100]
            },
          },
          // yaxis: {
          //   min: 0,
          //   max: 100
          // }
        }
    const optionsOutcome = {
        chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: 3,
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: dataOutcomeDate,
            tickAmount: 10,
            labels: {
              formatter: function(value, timestamp, opts) {
                return opts.dateFormatter(new Date(timestamp), 'dd MMM')
              }
            }
          },
          title: {
            text: 'Total Pengeluaran',
            align: 'center',
            margin: 20,
            style: {
              fontSize: "16px",
              fontFace: 'Roboto',
              color: '#f57328'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              gradientToColors: [ '#f57328'],
              shadeIntensity: 1,
              type: 'horizontal',
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100]
            },
          },
        }
    
    // set ReactApexChart series
    const seriesSales = [{
        name: 'Sales',
        data: dataSale
    }]
    // set ReactApexChart series

    const seriesIncome = [{
        name: 'Income',
        data: dataIncome,
    }]
    // set ReactApexChart series
    const seriesOutcome = [{
        name: 'Outcome',
        data: dataOutcome,
    }]

    return (
        <>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Products</p>
                                <h5 className="font-weight-bolder">
                                {totalProducts.length}
                                </h5>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm-sm mb-0 text-uppercase font-weight-bold">Total Product Categories</p>
                                <h5 className="font-weight-bolder">
                                    {totalCategories.length}
                                </h5>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                                <i className="ni ni-world text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Sales</p>
                                <h5 className="font-weight-bolder">
                                {totalSales.length}
                                </h5>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                                <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-xl-3 col-sm-6">
                    <div className="card">
                        <div className="card-body p-3">
                        <div className="row">
                            <div className="col-8">
                            <div className="numbers">
                                <p className="text-sm mb-0 text-uppercase font-weight-bold">Total Purchases</p>
                                <h5 className="font-weight-bolder">
                                {totalPurchases.length}
                                </h5>
                            </div>
                            </div>
                            <div className="col-4 text-end">
                            <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                                <i className="ni ni-cart text-lg opacity-10" aria-hidden="true" />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-12 mb-lg-0 mb-4">
                        <div className="card mb-5">
                            <ReactApexChart
                                options={optionsSales}
                                series={seriesSales}
                                type="line"
                                height={350}
                            />
                        </div>
                        <div className="card mb-5">
                            <ReactApexChart
                                options={optionsIncome}
                                series={seriesIncome}
                                type="line"
                                height={350}
                            />
                        </div>
                        <div className="card mb-5">
                            <ReactApexChart
                                options={optionsOutcome}
                                series={seriesOutcome}
                                type="line"
                                height={350}
                            />
                        </div>
                    </div>
                </div>
                
            </div>

        </>
    )
}

Dashboard.layout = (page) => <Base children={page} title={"Dashboard"}/>
