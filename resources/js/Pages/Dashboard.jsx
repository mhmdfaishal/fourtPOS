import React, { useEffect, useState } from 'react'
import Base from '../Layouts/Base'
import ReactApexChart from 'react-apexcharts'

export default function Dashboard(props) {
    const {data: totalCategories} = props.totalCategories; 
    const {data: totalProducts} = props.totalProducts;
    const {data: totalSales} = props.totalSales;
    const {data: totalPurchases} = props.totalPurchases;
    const [state, setState] = useState([])
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
            categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
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
          yaxis: {
            min: 0,
            max: 100
          }
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
            categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
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
          yaxis: {
            min: 0,
            max: 100
          }
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
            categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001','4/11/2001' ,'5/11/2001' ,'6/11/2001'],
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
          yaxis: {
            min: 0,
            max: 100
          }
        }
    
    // set ReactApexChart series
    const seriesSales = [{
        name: 'Sales',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
    }]
    // set ReactApexChart series
    const seriesIncome = [{
        name: 'Income',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
    }]
    // set ReactApexChart series
    const seriesOutcome = [{
        name: 'Outcome',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
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
