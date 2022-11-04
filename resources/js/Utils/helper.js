/* eslint-disable import/prefer-default-export */

export const convertToIDR = (number) =>     
    new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
}).format(number);