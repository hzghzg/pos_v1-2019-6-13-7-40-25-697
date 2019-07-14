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

const callback=(previousValue,currentValue)=>{
    const itemList=loadAllItems();
    if(previousValue.length==0){
        let obj={};
        if(currentValue.length<=10){
            obj.barcode=currentValue;
            obj.number=1;
            obj.unitPrice=itemList[itemList.map(item1=>item1.barcode).indexOf(currentValue)].price;
        }
        else{
            let splitBarcode=currentValue.split("-");
            obj.barcode=splitBarcode[0];
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
                obj.number=parseFloat(splitBarcode1[1]);
                obj.unitPrice=itemList[itemList.map(item1=>item1.barcode).indexOf(splitBarcode1[0])].price;
                previousValue.push(obj);
            }
        }

    }
    return previousValue;
}
const getDetailBarcodesInfo=(barcodes)=>{
    if(!isBarcodesValid(barcodes))
    return "The barcodes are wrong!"
    else{
    let detailBarcodesInfo=barcodes.reduce(callback,[]);
    return detailBarcodesInfo;
    }
}


