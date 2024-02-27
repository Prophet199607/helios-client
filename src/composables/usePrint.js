import {dateFormat1, timeFormat1} from "../utils/dateUtil.js";
import {formatCurrency2} from "../utils/currencyUtils.js";
import {useRouter} from "vue-router";

export default function usePrint() {
    const router = useRouter()
    const printReceipt = (receipt, is_duplicate) => {
        let print = '';
        const location = receipt.Company[0].Loca;
        delete receipt.Company[0].Loca;
        const company = Object.values(receipt.Company[0]).filter(i => i !== null);
        company[company.length - 1] = company[company.length - 1].toString().concat(` (${location})`);
        const customer = receipt.Customer[0];
        const payments = receipt.Payment;

        company.forEach(el => {
            print += generateReceiptLine(el, null)
        })

        print += generateReceiptEmptyFullLine()
        let title = "PAYMENT RECEIPT";
        if (is_duplicate) title += " - Duplicate Copy";
        print += generateReceiptLine(title, null)
        print += generateReceiptEmptyFullLine()

        print += generateReceiptFullLine()
        print += generateSidedReceiptLine(
            {name: 'Date ', val: dateFormat1(customer.inserted_date)},
            {name: 'Time ', val: timeFormat1(customer.inserted_date)},
            12)
        print += generateSidedReceiptLine(
            {name: 'Rec. No ', val: customer.doc_no},
            {name: 'Rep Code ', val: localStorage.getItem('Emp_Code')},
            5)
        print += generateReceiptFullLine()
        print += generateSidedReceiptLine(
            {name: 'Customer ', val: customer.customer_code},
            null,
            5)
        print += generateReceiptLine(customer.Cust_Name, 11)

        if (customer.Address1 !== '' || customer.Address2 !== '' || customer.Address3 !== '' || customer.Address4 !== '') {
            print += generateReceiptLine(
                `${customer.Address1} ${customer.Address2} ${customer.Address3} ${customer.Address4}`, 11)
        }

        print += generateReceiptFullLine()
        print += generateReceiptLine("Pay Mode  Cheque No   Date                Amount", 0)
        print += generateReceiptFullLine()
        payments.forEach(el => {
            print += generateReceiptItemLine([
                {value: el.payment_mode, start: 0},
                {value: el.cheque_no, start: 4},
                {value: dateFormat1(el.cheque_date), start: 6},
                {value: formatCurrency2(el.amount), start: 0},
            ])
        })

        const totalAmount = payments.reduce((total, el) => {
            return total + el.amount
        }, 0);

        print += generateReceiptTotalShortLine(48)

        print += generateReceiptTotalLine([
            {value: 'Total', start: 27},
            {value: formatCurrency2(totalAmount), start: 0},
        ])

        if (payments[0].payment_mode === 'Cheque') {
            print += generateReceiptEmptyFullLine()
            print += generateReceiptLineFromLeft("Note: If Payment received by Cheque/s are not honoured on due date, this receipt will be deemed invalid.", 0)
        }

        print += generateReceiptFullLine()
        print += generateReceiptLineFromLeft("Thank You - Come again", 0)
        print += generateReceiptEmptyFullLine()
        print += generateReceiptEmptyFullLine()
        print += generateReceiptTotalShortLine(0)
        print += generateReceiptLineFromLeft("Signature", 0)
        print += generateReceiptEmptyFullLine()
        print += generateReceiptFullLine()
        print += generateReceiptLine("System by onimta www.onimtait.com", null)
        print += generateReceiptEmptyFullLine()

        console.log(print)

        Android.showPrint(JSON.stringify({
            print
        }));

        router.push({name: 'collections-index'})
    }

    const charMaxLength = 48;
    const generateReceiptLine = (text, position = null) => {
        let lineLength = text.length;

        if (position) {
            if (lineLength <= (charMaxLength - position)) {
                return ' '.repeat(position).concat(text).concat('\n');
            } else {
                return sliceText2(text, lineLength, position);
            }
        }

        if (lineLength <= charMaxLength) {
            let x = Math.floor((charMaxLength - lineLength) / 2);
            return ' '.repeat(x).concat(text).concat('\n');
        }

        return sliceText(text, lineLength);

    }

    const generateReceiptLineFromLeft = (text, position) => {
        const lineLength = text.length;
        if (lineLength > charMaxLength) {
            return sliceText2(text, lineLength, 0);
        }
        return ' '.repeat(position).concat(text).concat('\n');
    }

    const generateReceiptFullLine = () => {
        return '-'.repeat(charMaxLength).concat('\n');
    }

    const generateReceiptTotalShortLine = (start) => {
        return '-'.repeat(12).padStart(start, ' ').concat('\n');
    }

    const generateReceiptEmptyFullLine = () => {
        return ' '.repeat(charMaxLength).concat('\n');
    }

    const generateSidedReceiptLine = (text1, text2, repeat) => {
        let v = '';
        let t1 = text1.name + ': ' + text1.val
        v += t1;
        if (text2) {
            let t2 = text2.name + ': ' + text2.val;
            v += ' '.repeat(repeat).concat(t2);
        }

        return v.concat('\n');
    }

    const generateReceiptItemLine = (items) => {
        let i = '';
        let c = items[0].value;
        items.forEach((item, index) => {
            let pad = 16;
            if (index === 3) {
                if (c === 'Cash') pad = 34
                i += item.value.padStart(pad, ' ')
            }
            else i += ' '.repeat(item.start).concat(item.value);
        })

        return i.concat('\n');
    }

    const generateReceiptTotalLine = (items) => {
        let i = '';
        items.forEach((item, index) => {
            let pad = 16;
            if (index === 1) {
                i += item.value.padStart(pad, ' ')
            }
            else i += ' '.repeat(item.start).concat(item.value);
        })

        return i.concat('\n');
    }

    const sliceText = (text, lineLength) => {
        let t = '';
        [text.substring(0, charMaxLength), text.slice(charMaxLength - lineLength)]
            .forEach(el => {
                t += generateReceiptLine(el, null)
            });
        return t;
    }

    const sliceText2 = (text, lineLength, position) => {
        let t = '';
        [text.substring(0, charMaxLength - position), text.slice((charMaxLength - position) - lineLength)]
            .forEach(el => {
                t += generateReceiptLineFromLeft(el, position)
            });
        return t;
    }

    return {printReceipt}
}