import React, { useEffect } from 'react'
// import { Viewer, Worker } from '@react-pdf-viewer/core'
// import '@react-pdf-viewer/core/lib/styles/index.css'

export default function ShowInvoice(props) {
    const { invoice: invoice } = props;
    window.open('/cashier','_blank');
    window.location.href = `/storage/sale/invoices/${invoice.reference}.pdf`;
    return (<></>)
}