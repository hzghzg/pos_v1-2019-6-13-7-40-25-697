'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
const isBarcodesValid=(barcodes)=>{//传进来的实际是tags
    const itemList=loadAllItems();
    let barcodeInItemList=itemList.map(item=>item.barcode);
    let newBarcodes=barcodes.map(item=>item.length<=10?item:item.substring(0,10));
    let sameElementInBarcodesAndInBarcodeInItemList=newBarcodes.filter(item=>barcodeInItemList.includes(item));
    let validFlag=(sameElementInBarcodesAndInBarcodeInItemList.length==barcodes.length)?true:false;
    return validFlag;
}

const getDetailBarcodesInfo=(barcodes)=>{
    if(!isBarcodesValid(barcodes))
    return "The barcodes are wrong!"
    else{
    let detailBarcodesInfo=barcodes.reduce(callback,[]);
    return detailBarcodesInfo;
    }
}

const callback=(previousValue,currentValue)=>{
    const itemList=loadAllItems();
    if(previousValue.length==0){
        let obj={};
        if(currentValue.length<=10){
            obj.barcode=currentValue;
            obj.name=itemList[itemList.map(item1=>item1.barcode).indexOf(currentValue)].name;
            obj.unit=itemList[itemList.map(item1=>item1.barcode).indexOf(currentValue)].unit;
            obj.number=1;
            obj.unitPrice=itemList[itemList.map(item1=>item1.barcode).indexOf(currentValue)].price;
        }
        else{
            let splitBarcode=currentValue.split("-");
            obj.barcode=splitBarcode[0];
            obj.name=itemList[itemList.map(item1=>item1.barcode).indexOf(splitBarcode[0])].name;
            obj.unit=itemList[itemList.map(item1=>item1.barcode).indexOf(splitBarcode[0])].unit;
            obj.number=parseFloat(splitBarcode[1]);
            obj.unitPrice=itemList[itemList.map(item1=>item1.barcode).indexOf(splitBarcode[0])].price;
        }
        previousValue.push(obj);
    }
    else{
        if(currentValue.length<=10){
            if(previousValue.map(item=>item.barcode).includes(currentValue)){
                previousValue[previousValue.map(item1=>item1.barcode.indexOf(currentValue))].number++;
            }
            else{
                let obj={};
                obj.barcode=currentValue;
                obj.name=itemList[itemList.map(item1=>item1.barcode).indexOf(currentValue)].name;
                obj.unit=itemList[itemList.map(item1=>item1.barcode).indexOf(currentValue)].unit;
                obj.number=1;
                obj.unitPrice=itemList[itemList.map(item1=>item1.barcode).indexOf(currentValue)].price;
                previousValue.push(obj);
            }
        }
        else{
            let splitBarcode1=currentValue.split("-");
            if(previousValue.map(item=>item.barcode).includes(splitBarcode1[0])){
                previousValue[previousValue.map(item=>item.barcode).indexOf(splitBarcode1[0])].number+=parseFloat(splitBarcode1[1]);
            }
            else{
                let obj={};
                obj.barcode=splitBarcode1[0];
                obj.name=itemList[itemList.map(item1=>item1.barcode).indexOf(splitBarcode1[0])].name;
                obj.unit=itemList[itemList.map(item1=>item1.barcode).indexOf(splitBarcode1[0])].unit;
                obj.number=parseFloat(splitBarcode1[1]);
                obj.unitPrice=itemList[itemList.map(item1=>item1.barcode).indexOf(splitBarcode1[0])].price;
                previousValue.push(obj);
            }
        }

    }
    return previousValue;
}

const calculateSubtotal=(detailBarcodesInfo)=>{
    let receiptInformation=detailBarcodesInfo.reduce(callback1,detailBarcodesInfo);
    return receiptInformation;
}

const callback1=(previousValue,currentValue)=>{
    let promotionBarcodeslist=loadPromotions()[0].barcodes;
    if(promotionBarcodeslist.includes(currentValue.barcode)){
        let subtotal=(currentValue.number-parseInt(currentValue.number/2))*currentValue.unitPrice;
        currentValue.subtotal=subtotal;
    }
    else{
        let subtotal=currentValue.number*currentValue.unitPrice;
        currentValue.subtotal=subtotal;
    }
    return previousValue;
}

const calculateSumOfSubtotal=(receiptInformation)=>{
    let sumOfSubtotal=receiptInformation.reduce((sum,currentValue)=>sum+currentValue.subtotal,0);
    return sumOfSubtotal;
}

const getTotalPromotionPrice=(receiptInformation)=>{
    let totalPromotionPrice=receiptInformation.reduce((sum,currentValue)=>sum+(currentValue.number*currentValue.unitPrice-currentValue.subtotal),0);
    return totalPromotionPrice;
}

const printReceipt=(barcodes)=>{
    let detailBarcodesInfo=getDetailBarcodesInfo(barcodes);
    let receiptInformation=calculateSubtotal(detailBarcodesInfo);
    let sumOfSubtotal=calculateSumOfSubtotal(receiptInformation);
    let totalPromotionPrice=getTotalPromotionPrice(receiptInformation);
    let receipt=`***<没钱赚商店>收据***\n`;
    let detailInfo=receiptInformation.map(item=>`名称：${item.name}，数量：${item.number}${item.unit}，单价：${item.unitPrice}(元)，小计：${item.subtotal}(元)`);
    receipt+=detailInfo.reduce((previousValue,currentValue)=>previousValue+currentValue+'\n','');
    receipt+=`----------------------\n总计：${sumOfSubtotal}(元)\n节省：${totalPromotionPrice}(元)\n**********************`;
    return receipt;
}



